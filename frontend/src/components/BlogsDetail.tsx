import { blogschema } from "../hooks"
import Appbar from "./Appbar"
import { Avatar } from "./Blogcard"


function BlogsDetail({ Blog }: { Blog: blogschema }) {
    return (
        <div>
            <Appbar />
            <div className="flex justify-center flex-col">
                <div className="grid grid-cols-12 px-10 pt-24 max-w-screen-2xl">
                    <div className=" col-span-8">
                        <div className="text-5xl font-extrabold ">
                            {Blog.title}
                        </div>
                        <div className="my-4 text-slate-400 font-medium">
                            Posted on 2nd Dec 2023
                        </div>
                        <div>
                            {Blog.content}
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className=" text-lg mb-5">
                            Author
                        </div>
                        <div className="flex gap-9 ">
                            <div className="flex flex-col justify-center">
                                <Avatar name={Blog.author.name || "Anonymous"} size="big" />
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className=" text-xl font-bold">
                                    {Blog.author.name || "Anonymous"}
                                </div>
                                <div className="text-slate-400">
                                    Master of mirth, purveyor of Punes, and the funniest person in the kingdom
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogsDetail