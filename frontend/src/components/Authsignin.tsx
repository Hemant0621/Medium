import { useState } from 'react'
import { SigninInput } from '@hemant0621/common'
import axios from 'axios'
import {BACKEND_URL} from '../../config'

export default function Authsignin() {

    const [signininputs , setsignininputs] = useState<SigninInput>({
        email:"",
        password:""
    })

    async function sendrequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,signininputs)
            localStorage.setItem('token' , response.data.jwt)
            location.href = '/'
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="w-96 h-80 m-auto mt-24">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-xl bg-slate-200">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2 ">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e)=>{
                                        setsignininputs({
                                            ...signininputs,
                                            email : e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e)=>{
                                        setsignininputs({
                                            ...signininputs,
                                            password : e.target.value
                                        })
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="button"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={sendrequest} 
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Signup
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
