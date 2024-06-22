import { Link } from "react-router-dom"

interface Blogcardprops {
    authorname: String,
    title: String,
    content: String,
    publisedDate: String,
    id : String
}

function Blogcard({
    authorname,
    title,
    content,
    publisedDate,
    id
}: Blogcardprops) {
    return (
        <Link to={`/blog/${id}`} className=" no-underline text-inherit">
            <div className="mt-5 transition-transform duration-200 scale-150 translate-x-10 cursor-pointer">
                <div className="flex">
                    <div className="flex justify-center flex-col m-2 ">
                        <Avatar name={authorname} size="small" />
                    </div>
                    <div className="flex justify-center flex-col font-medium">
                        {authorname}
                    </div>
                    <div className="flex justify-center flex-col font-light m-1 text-[7px] text-slate-500">
                        &#9679;
                    </div>
                    <div className="flex justify-center flex-col font-thin text-slate-400">
                        {publisedDate}
                    </div>
                </div>
                <div className="font-bold m-2 text-xl">
                    {title}
                </div>
                <div className=" font-thin m-2">
                    {content.slice(0, 100) + '...'}
                </div>
                <div className=" font-thin m-2 text-slate-400">
                    {`${Math.ceil(content.length / 100)} minutes(s) read`}
                </div>
                <div className=" bg-slate-200 h-[2px] w-full mt-5">

                </div>
            </div>
        </Link>
    )
}

export function Avatar({ name, size = "small" }: { name: String, size: "small" | "big" }) {
    return <div className={`relative inline-flex items-center justify-center ${size == "small" ? "w-7 h-7" : " w-10 h-10"} overflow-hidden bg-slate-400 rounded-full dark:bg-gray-600`}>
        <span className={`font-light text-white ${size == "small" ? "text-sm" : " text-md"} `}>
            {name[0]}
        </span>
    </div>
}

export default Blogcard