import React, { useContext, useState } from 'react';
import { UserProvider } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { sendEmailVerification, updateProfile } from 'firebase/auth';
import swal from 'sweetalert';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import axios from 'axios';
import GoogleSignIn from '../../common/GoogleSignIn';
import { Link } from 'react-router-dom';
import auth from '../../firebase/firebase.config';

const Registration = ({ setCheck }) => {

    const { createUser, setUserPhoto } = useContext(UserProvider)
    const [see, setSee] = useState(true)
    const [img, setImg] = useState('')
    const navigate = useNavigate()

    const handelFileData = (e) => {
        const imgbbApiKey = '48262f7096c971f7f2f1b695ae2a6be0';
        const selectedFile = e.target.files[0];
        const inputType = selectedFile.type.split('/')[1];
        if (inputType !== 'png' && inputType !== 'jpeg') {
            toast.error("Please input jpeg/png image")
            return
        }
        const formData = new FormData();
        formData.append('image', selectedFile);
        axios.post('https://api.imgbb.com/1/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                key: imgbbApiKey,
            },
        })
            .then(response => {
                const imageUrl = response.data.data.url;
                setImg(imageUrl)
                toast.success('Image upload sucessfylly !')
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handelRegistration = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const photo = img;
        const email = e.target.email.value;
        const password = e.target.password.value;
        if (password.length < 6) {
            return toast.error("PLease provide 6 character password")
        }

        createUser(email, password)
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: photo || "https://www.w3schools.com/howto/img_avatar.png"
                }).then(() => {
                    toast.success('User created successfully !')
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            swal("Varify email!", `Check your email and confirm now`, "success");
                            navigate('/')
                        });
                    setUserPhoto({ photo, name })
                }).catch((error) => {
                    console.log(error)
                });
            }).catch(() => {
                toast.error("User alrady created. please add new email")
            })

    }

    const handelRoute = () => {
        setCheck(true)
    }


    return (
        <div>
            <div class="relative">
                <img src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" class="absolute inset-0 object-cover w-full h-full" alt="" />
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
                                        Sign up for updates
                                    </h3>
                                    <form onSubmit={handelRegistration}>
                                        <div class="mb-1 sm:mb-2">
                                            <label class="inline-block mb-1 font-medium">Your name</label>
                                            <input
                                                placeholder="John"
                                                required=""
                                                type="text"
                                                class="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                                name="name"
                                            />
                                        </div>
                                        <div className='mt-4 mb-2 sm:mb-4"'>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Please select your profile image</label>
                                            <input onChange={handelFileData} type="file" name="file-input" id="file-input" className="block w-full text-sm border border-gray-200 rounded-md shadow-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400" required={true} />
                                        </div>
                                        <div class="mb-1 sm:mb-2">
                                            <label class="inline-block mb-1 font-medium">E-mail</label>
                                            <input
                                                placeholder="john.doe@example.org"
                                                required=""
                                                type="text"
                                                class="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                                name="email"
                                            />
                                        </div>

                                        <div className='relative'>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                            <input type={see ? 'password' : 'text'} name="password" id="password" placeholder="Password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                                            <span className='absolute cursor-pointer bottom-3 right-3' onClick={() => setSee(!see)}>{!see ? <AiOutlineEye className='dark:text-white'></AiOutlineEye> : <AiOutlineEyeInvisible className='dark:text-white'></AiOutlineEyeInvisible>} </span>
                                        </div>

                                        <div class="mt-4 mb-2 sm:mb-4">
                                            <button
                                                type="submit"
                                                class="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide bg-red-400 text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                                            >
                                                Registration
                                            </button>
                                        </div>
                                    </form>
                                    <div>
                                        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                            Already have an account?
                                            <a onClick={handelRoute} class="text-blue-600 cursor-pointer decoration-2 pl-1 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                                Sign in here
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

export default Registration;