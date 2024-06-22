import { Link } from 'react-router-dom'
import { Avatar } from './Blogcard'

function Appbar() {


    return (
        <div className='border-b flex justify-between px-10
        py-4'>
            <Link to={"/blogs"} className=' no-underline text-inherit'>
                <div className='flex justify-center flex-col cursor-pointer'>
                    Medium
                </div>
            </Link>
            <div>
                <Link to={"/publish"}>
                    <button type="button" className="text-white bg-green-400 hover:bg-green-500 border-0 font-medium rounded-full text-sm mx-5 cursor-pointer px-5 py-2.5 text-center ">Create</button>
                </Link>
                <Avatar name={"Hemant"} size={"big"} />
            </div>
        </div>
    )
}

export default Appbar