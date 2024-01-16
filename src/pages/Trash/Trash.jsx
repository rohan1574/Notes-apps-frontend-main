import React, { useContext, useState } from 'react';
import useAllTrash from '../../hooks/useAllTrash';
import { SlOptionsVertical } from 'react-icons/sl';
import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios';
import { RiDeleteBin6Line } from "react-icons/ri";
import { UserProvider } from '../../context/AuthContext';

const Trash = () => {
    const { isPending, error, trash: notes, refetch } = useAllTrash()
    const axiosData = useAxios();
    const { search } = useContext(UserProvider)

    const [isHovered, setIsHovered] = useState(null);

    const handleMouseOver = (index) => {
        setIsHovered(index);
    };

    const handleMouseLeave = () => {
        setIsHovered(null);
    };

    const handelTrastDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosData.delete(`/trash/${id}`)
                    .then(res => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your Note has been permanently deleted.",
                            icon: "success"
                        });
                        refetch()
                    })
            }
        });
    }

    return (
        <div>
            <div>
                {
                    notes?.length > 0 ? <div className='flex flex-wrap justify-center gap-3'>
                        {notes?.filter((user) => {
                            return search.toLowerCase() === '' ? user : (user?.title.toLowerCase().includes(search) || user?.text.toLowerCase().includes(search))
                        }).map((item, i) => (
                            <div
                                key={i}
                                onMouseOver={() => handleMouseOver(i)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {
                                    isHovered === i ? <div className='relative'>
                                        <div className="relative shadow-xl cursor-pointer card w-96 bg-red-50">
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
                                                <li onClick={() => handelTrastDelete(item?._id)}><a>Delete note</a></li>
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
                            <RiDeleteBin6Line className='text-gray-400 text-8xl' />
                            <p className='pt-2 text-2xl text-gray-400'>No notes in Trash</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Trash;