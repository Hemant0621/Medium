import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config";


interface blog {
    content: String,
    title: String,
    author: {
        name: String
    },
    id : String
}

export const useBlogs = () => {
    const [loading, setloading] = useState(true);
    const [blogs, setblogs] = useState<blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            setblogs(res.data.blogs);
            setloading(false)
        })
    })

    return {
        loading,
        blogs
    }
}

 export interface blogschema {
    title: String,
    content: String,
    author: {
        name: String
    }
}

export const useBlog = ({id} : {id : String}) => {
    const [loading, setloading] = useState(true);
    const [blog, setblog] = useState<blogschema>({
        title : "",
        content : "",
        author : {
            name : "Anonymus"
        }
    });
    console.log(id)
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog?id=${id}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            setblog(res.data.blog);
            setloading(false)
        })
    },[id])

    return {
        loading,
        blog
    }
}