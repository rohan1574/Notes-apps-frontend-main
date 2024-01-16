import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserProvider } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import GoogleSignIn from '../../common/GoogleSignIn';
import { Link } from 'react-router-dom';

const Login = ({ setCheck }) => {
    const { signIn } = useContext(UserProvider)
    const [see, setSee] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()
    const handelLogin = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;

        signIn(email, password)
            .then(() => {
                toast.success('Login successfully !')
                navigate(location?.state ? location.state : '/')
            }).catch(() => {
                toast.error("Login faild")
            })
    }

    const handelRoute = () => {
        setCheck(false)
    }


    return (
        <div>
            <div class="relative">
                <img src="https://images.pexels.com/photos/3228766/pexels-photo-3228766.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260" class="absolute inset-0 object-cover w-full h-full" alt="" />
                <div class="relative bg-opacity-75 bg-[#00000099]">
                    <svg class="absolute inset-x-0 -bottom-1 text-white" viewBox="0 0 1160 163">
                        <path
                            fill="currentColor"
                            d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
                        ></path>
                    </svg>
                    <div class="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                        <div class="flex flex-col items-center justify-between xl:flex-row">
                            <div class="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                                <h2 class="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                                    The quick, brown fox <br class="hidden md:block" />
                                    jumps over a lazy dog
                                </h2>
                                <p class="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudan, totam rem aperiam, eaque ipsa quae.
                                </p>
                                <a href="/" aria-label="" class="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-accent-400 hover:text-teal-accent-700">
                                    Learn more
                                    <svg class="inline-block w-3 ml-2" fill="currentColor" viewBox="0 0 12 12">
                                        <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z"></path>
                                    </svg>
                                </a>
                            </div>
                            <div class="w-full max-w-xl xl:px-8 xl:w-5/12">
                                <div class="bg-white rounded shadow-2xl p-7 sm:p-10">
                                    <h3 class="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                                        Sign in for updates
                                    </h3>
                                    <form onSubmit={handelLogin}>
                                        <div class="mb-1 sm:mb-2">
                                            <label for="email" class="inline-block mb-1 font-medium">E-mail</label>
                                            <input
                                                placeholder="john.doe@example.org"
                                                required=""
                                                type="text"
                                                class="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                                id="email"
                                                name="email"
                                            />
                                        </div>
                                        <div className='relative'>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                            <input type={see ? 'password' : 'text'} name="password" id="password" placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                                            <span className='absolute cursor-pointer bottom-3 right-3' onClick={() => setSee(!see)}>{!see ? <AiOutlineEye className='dark:text-white'></AiOutlineEye > : <AiOutlineEyeInvisible className='dark:text-white'></AiOutlineEyeInvisible>} </span>
                                        </div>
                                        <div class="mt-4 mb-2 sm:mb-4">
                                            <button
                                                type="submit"
                                                class="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide bg-red-300 text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                                            >
                                                Log in
                                            </button>
                                        </div>
                                    </form>
                                    <div>
                                        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                            I have no account?
                                            <a onClick={handelRoute} class="text-blue-600 cursor-pointer decoration-2 pl-1 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                                Sign up here
                                            </a>
                                        </p>
                                    </div>
                                    <div className="divider">OR</div>
                                    <GoogleSignIn></GoogleSignIn>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;