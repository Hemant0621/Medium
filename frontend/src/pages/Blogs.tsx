import Appbar from '../components/Appbar'
import Blogcard from '../components/Blogcard'
import Blogskeliton from '../components/Blogskeliton';
import { useBlogs } from '../hooks'

function Blog() {

    const {loading,blogs} = useBlogs();

    if(loading){
        return <div>
            <Appbar/>
            <div className='flex justify-center mt-10'>
                <div className='w-[50%]'>
                    <Blogskeliton />
                    <Blogskeliton />
                    <Blogskeliton />
                    <Blogskeliton />
                </div>
            </div>
        </div>
    }

    return (
        <div>
            <Appbar/>
            <div className='flex justify-center'>
                <div className='w-[60%]'>
                    {blogs.map((blog)=>(
                        <Blogcard
                            authorname={blog.author.name || "Anonymous"}
                            title={blog.title}
                            content={blog.content}
                            publisedDate={'21 Dec 2023'}
                            id={blog.id}
                        />
                    ))}
                    
                </div>
            </div>
        </div>
    )
}

export default Blog