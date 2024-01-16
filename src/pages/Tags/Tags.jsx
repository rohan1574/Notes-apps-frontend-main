import React, { useContext, useState } from 'react';
import useAllTags from '../../hooks/useAllTags';
import { PiTagSimple } from "react-icons/pi";
import useAllNots from '../../hooks/useAllNots';
import { GoLightBulb } from 'react-icons/go';
import { SlOptionsVertical } from 'react-icons/sl';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useAllCopyNotes from '../../hooks/useAllCopyNotes';
import { UserProvider } from '../../context/AuthContext';

const Tags = () => {
    const { isPending, error, tags, refetch } = useAllTags()
    const { notes: allnots, refetch: noterefetch } = useAllNots()
    const axiosData = useAxios()
    const { refetch: copyReface } = useAllCopyNotes()
    const { user } = useContext(UserProvider)

    const [notes, setNotes] = useState([])
    const handelSearchTags = (tag) => {
        const filterValue = allnots?.filter(item => item?.tags === tag)
        setNotes(filterValue)
        document.getElementById('my_modal_10').showModal()
    }

    const [isHovered, setIsHovered] = useState(null);

    const handleMouseOver = (index) => {
        setIsHovered(index);
    };

    const handleMouseLeave = () => {
        setIsHovered(null);
    };

    // Card modal
    const [item, setItem] = useState({})
    const handelCardDetails = (item) => {
        setItem(item)
        document.getElementById('my_modal_10').close()
        document.getElementById('my_modal_5').showModal()
    }

    // Edit note
    const [editValue, setEditValue] = useState({})
    const handelEditNote = (item) => {
        setEditValue(item)
        document.getElementById('my_modal_5').close()
        document.getElementById('my_modal_7').showModal()
    }
    const handelUpdate = (e) => {
        e.preventDefault()
        const title = e.target.title.value;
        const text = e.target.text.value;
        const data = { title, text }
        axiosData.put(`/note/${editValue?._id}`, data)
            .then(res => {
                toast.success('Note successfully updated !')
                refetch()
                noterefetch()
                document.getElementById('my_modal_7').close()
                e.target.reset()
            })
    }

    // Edit tags
    const [editTags, setEditTags] = useState({})
    const handelEditTags = (item) => {
        setEditTags(item)
        document.getElementById('my_modal_5').close()
        document.getElementById('my_modal_9').showModal()
    }
    const handelUpdateTags = (e) => {
        e.preventDefault()
        const tags = e.target.tags.value;
        const data = { tags }
        axiosData.put(`/note/${editTags?._id}`, data)
            .then(res => {
                toast.success('Note successfully updated !')
                refetch()
                noterefetch()
                document.getElementById('my_modal_9').close()
                e.target.reset()
            })
    }

    const handelNoteDelete = (id) => {
        document.getElementById('my_modal_5').close()
        document.getElementById('my_modal_10').close()
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosData.delete(`/note/${id}`)
                    .then(res => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your note has been deleted.",
                            icon: "success"
                        });
                        refetch()
                        noterefetch()
                    })
            }
        });
    }

    const handelNoteCopy = (item) => {
        document.getElementById('my_modal_10').close()
        document.getElementById('my_modal_5').close()
        const { _id, ...data } = item
        const copyNote = {
            ...data, email: user?.email
        }
        axiosData.post(`/notecopy`, copyNote)
            .then(res => {
                toast.success('Successfully copy notes!')
                copyReface()
            })
    }


    return (
        <div>
            {
                tags?.length > 0 ? <div className='grid grid-cols-1 gap-5 p-5 lg:grid-cols-3 md:grid-cols-2'>
                    {
                        tags?.map((item, i) => {
                            return <a onClick={() => handelSearchTags(item)} key={i} className="flex flex-col transition bg-white border shadow-sm cursor-pointer group rounded-xl hover:shadow-md dark:bg-slate-900 dark:border-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" >
                                <div className="p-4 md:p-5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path></svg>
                                            <div className="ms-3">
                                                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 dark:group-hover:text-gray-400 dark:text-gray-200">
                                                    {item}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="ps-3">
                                            <svg className="flex-shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        })
                    }
                </div> : <div className='flex items-center justify-center w-full pt-32'>
                    <div className='flex flex-col items-center justify-center'>
                        <PiTagSimple className='text-gray-400 text-8xl' />
                        <p className='pt-2 text-2xl text-gray-400'>No notes with this label yet</p>
                    </div>
                </div>
            }

            {/* Modal Open */}

            <dialog id="my_modal_10" className="modal">
                <div className="p-10 no-scrollbar modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                    </form>
                    <div>
                        {
                            notes?.length > 0 ? <div className='flex flex-wrap justify-center gap-3'>
                                {notes?.map((item, i) => (
                                    <div
                                        key={i}
                                        onMouseOver={() => handleMouseOver(i)}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {
                                            isHovered === i ? <div className='relative'>
                                                <div onClick={() => handelCardDetails(item)} className="relative shadow-xl cursor-pointer card w-96 bg-red-50">
                                                    <div className="card-body">
                                                        <span className='absolute top-0 border rounded-full left-1'>✔</span>
                                                        <h2 className="card-title">{item?.title?.length > 25 ? item?.title.slice(0, 25) + " ..." : item?.title}</h2>
                                                        <p>{item?.text?.length > 200 ? item?.text.slice(0, 200) + " ..." : item?.text}</p>
                                                        <span className='pt-4'>
                                                            <p className='flex'>
                                                                <svg class="mr-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path></svg>
                                                                <span class="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">{item?.tags}</span>
                                                            </p>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="absolute bottom-0 right-0 dropdown dropdown-end">
                                                    <div tabIndex={0} role="button" className="m-1 btn bg-red-50 hover:bg-red-50"><SlOptionsVertical /></div>
                                                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                                        <li onClick={() => handelNoteDelete(item?._id)}><a>Delete note</a></li>
                                                        <li onClick={() => handelNoteCopy(item)}><a>Copy note</a></li>
                                                    </ul>
                                                </div>
                                            </div> : <div className="shadow-xl card w-96 bg-base-500">
                                                <div className="card-body">
                                                    <h2 className="card-title">{item?.title?.length > 25 ? item?.title.slice(0, 25) + " ..." : item?.title}</h2>
                                                    <p>{item?.text?.length > 200 ? item?.text.slice(0, 200) + " ..." : item?.text}</p>
                                                    <p className='flex pt-4'>
                                                        <svg class="mr-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path></svg>
                                                        <span class="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">{item?.tags}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                ))}
                            </div> : <div className='flex items-center justify-center w-full pt-32'>
                                <div className='flex flex-col items-center justify-center'>
                                    <GoLightBulb className='text-gray-400 text-8xl' />
                                    <p className='pt-2 text-2xl text-gray-400'>Notes you add appear here</p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </dialog>

            {/* Card */}
            <dialog id="my_modal_5" className="modal">
                <div className="p-10 modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                    </form>
                    <div className="relative shadow-xl cursor-pointer card bg-red-50">
                        <div className="card-body">
                            <span className='absolute top-0 border rounded-full left-1'>✔</span>
                            <h2 className="card-title">{item?.title?.length > 25 ? item?.title.slice(0, 25) + " ..." : item?.title}</h2>
                            <p>{item?.text?.length > 200 ? item?.text.slice(0, 200) + " ..." : item?.text}</p>
                            <p className='flex pt-3'>
                                <svg class="mr-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path></svg>
                                <span class="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">{item?.tags}</span>
                            </p>
                            <span className='flex flex-wrap items-center justify-center gap-4 pt-5'>
                                <span onClick={() => handelNoteCopy(item)} class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Copy note</span>
                                <span onClick={() => handelNoteDelete(item?._id)} class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Delete note</span>
                                <span onClick={() => handelEditNote(item)} class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Edit note</span>
                                <span onClick={() => handelEditTags(item)} class="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">Change tag</span>
                            </span>
                        </div>
                    </div>
                </div>
            </dialog>

            {/* Update value */}
            <dialog id="my_modal_7" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handelUpdate}>
                        <input defaultValue={editValue?.title} name='title' className='w-full px-4 py-3 focus:outline-none' placeholder='Title' required type="text" />
                        <input defaultValue={editValue?.text} name='text' className='w-full px-4 py-3 focus:outline-none' placeholder='Take a note' required type="text" />
                        <p className='flex px-4 pt-3 pb-2'>
                            <svg class="mr-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path></svg>
                            <span class="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">{editValue?.tags}</span>
                        </p>
                        <div class="flex items-center pt-1">
                            <button onClick={() => document.getElementById('my_modal_7').close()} type="button" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-es-xl border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-cookies">
                                Cancel
                            </button>
                            <button type="submit" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-ee-xl border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-cookies">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>

            {/* Update value */}
            <dialog id="my_modal_9" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                    </form>
                    <form onSubmit={handelUpdateTags}>
                        <p className='flex px-4 pt-3 pb-2'>
                            <svg class="mr-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path></svg>
                            <span class="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">{editTags?.tags}</span>
                        </p>
                        <input name='tags' className='w-full px-4 py-3 focus:outline-none' placeholder='Take a tag' required type="text" />
                        <div class="flex items-center pt-1">
                            <button onClick={() => document.getElementById('my_modal_9').close()} type="button" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-es-xl border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-cookies">
                                Cancel
                            </button>
                            <button type="submit" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-ee-xl border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-cookies">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default Tags;