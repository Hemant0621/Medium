import { Hono } from "hono";
import { decode, verify, sign } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogInput, updateBlogInput } from "@hemant0621/common";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        userId: string;
    }
}>();

//middleware

blogRouter.use("/*", async (c, next) => {
    const header = c.req.header("authorization") || ""

    const token = header.split(" ")[1];

    const res = await verify(token, c.env.JWT_SECRET)
    const user = res.id
    if (user) {
        c.set('userId', user.toString())
        await next();
    }
    else {
        c.status(403)
        return c.json({
            error: 'unauthorized'
        })
    }
})

blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body: any = await c.req.json();

    const { success } = createBlogInput.safeParse(body);

    if (!success) {
        c.status(400)
        return c.json({
            message: "wrong input formate"
        })
    }
    const authorId = c.get('userId')
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    })

    return c.json({
        id: blog.id
    })
})


blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const body: any = await c.req.json();

        const { success } = updateBlogInput.safeParse(body);

        if (!success) {
            c.status(400)
            return c.json({
                message: "wrong input formate"
            })
        }

        const blog = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        })

        return c.json({
            id: blog
        })
    } catch (e) {
        console.log(e);
        c.status(411);
        return c.text("cant update the post")
    }
})


blogRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = c.req.query('id');
    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            },
            select : {
                id : true,
                title : true,
                content : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        })

        return c.json({
            blog
        })
    } catch (e) {
        console.log(e)
        c.status(411)
        return c.json({
            message: "cant fetch the blog post"
        })
    }
})

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body: any = c.req.query();
    console.log(body)
    const limit = body.limit || 10
    const page = body.page || 1

    try {
        const blogs = await prisma.post.findMany({
            skip: limit * (page - 1),
            take: Number(limit),
            select : {
                content : true,
                title : true,
                author : {
                    select : {
                        name : true
                    }
                },
                id : true
            }
        })

        return c.json({
            blogs
        })
    } catch (e) {
        console.log(e)
        c.status(411)
        return c.json({
            message: "cant fetch the blog post"
        })
    }
})
