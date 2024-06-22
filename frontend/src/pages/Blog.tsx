import { useParams } from "react-router-dom";
import BlogsDetail from "../components/BlogsDetail";
import { useBlog } from "../hooks"
import Blogskeliton from "../components/Blogskeliton";
import Appbar from "../components/Appbar";

function Blog() {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || ""
  });

  console.log(blog)
  if(loading){
    return <div>
    <Appbar/>
    <div className='flex justify-center mt-10'>
        <div className='w-[80%]'>
            <Blogskeliton/>
        </div>
    </div>
</div>
  }

  return (
    <div>
      <BlogsDetail Blog={blog}/>
    </div>
  )
}

export default Blog