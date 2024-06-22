import { Hono } from "hono";
import { decode, verify, sign } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signinInput, signupInput } from "@hemant0621/common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>();


userRouter.post('/signup', async (c) => {

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  console.log(body)
  if (!success) {
    c.status(400)
    return c.json({
      message: "wrong input formate"
    })
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())



  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name
      },
    })

    const token = await sign({ id: user.id }, c.env.JWT_SECRET)

    return c.json({
      jwt: token
    })
  } catch (e) {
    c.status(411)
    return c.json({
      message: "can't signup"
    })
  }
})


userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())



  try {
    const body = await c.req.json();

    const { success } = signupInput.safeParse(body);

    if (!success) {
      c.status(400)
      return c.json({
        message: "wrong input formate"
      })
    }


    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    })

    if (!user) {
      c.status(403);
      return c.json({
        message: "incorrect credendtials"
      })
    }

    const token = await sign({ id: user?.id }, c.env.JWT_SECRET)

    return c.json({
      jwt: token
    })

  } catch (e) {
    console.log(e);
    c.status(411);
    return c.text('Invalid')
  }
})