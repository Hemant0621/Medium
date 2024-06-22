import { useState } from 'react';
import Appbar from '../components/Appbar';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { useNavigate } from 'react-router-dom';

const Publish = () => {
    const [title, setTitle] = useState('');
    const [content, setcontent] = useState('');
    const navigate = useNavigate();


    return (
        <div>
            <Appbar />
            <div className='max-w-3xl mx-auto p-8 bg-white shadow-md rounded mt-10'>
                <div className=" mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your title here"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setcontent(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                        placeholder="Enter your content here"
                        rows={15}
                        required
                    ></textarea>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={async () => {
                            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                                title,
                                content
                            }, {
                                headers: {
                                    authorization: `Bearer ${localStorage.getItem("token")}`
                                }
                            })
                            console.log(response)
                            navigate(`/blog/${response.data.id}`)
                        }}
                    >
                        Publish
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Publish;
