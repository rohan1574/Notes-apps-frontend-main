import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useAllCopyNotes from '../../hooks/useAllCopyNotes';
import { GoLightBulb } from 'react-icons/go';
import useAxios from '../../hooks/useAxios';
import toast from 'react-hot-toast';
import { UserProvider } from '../../context/AuthContext';

const Dashboard = () => {
    const { setSearch, user, logOut, userPhoto } = useContext(UserProvider)
    const { copynotes, refetch } = useAllCopyNotes()
    const axiosData = useAxios()
    const handelCopyDelete = (id) => {
        axiosData.delete(`/notecopy/${id}`)
            .then(res => {
                toast.success('Successfully delete notes!')
                refetch()
            })
    }

    const handelLogOut = () => {
        logOut()
            .then(() => {
                toast.success('Log out Successfully !')
            }).catch((error) => {
                console.log(error.message)
            })
    }

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <label htmlFor="my-drawer-2" className=" drawer-button lg:hidden"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg></label>
                        </div>

                    </div>
                    <a className="hidden mr-3 text-xl btn btn-ghost lg:mr-10 md:block">NoteApps</a>
                    <div className="relative form-control">
                        <div class='max-w-md mx-auto'>
                            <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                                <div class="grid place-items-center h-full w-12 text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    onChange={(e) => setSearch(e.target.value)}
                                    class="peer lg:w-96 md:w-80 w-32 outline-none text-sm text-gray-700 pr-2"
                                    type="search"
                                    id="search"
                                    placeholder="Search notes.." />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navbar-end ">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                <span className="badge badge-sm indicator-item">{copynotes?.length || 0}</span>
                            </div>
                        </div>
                        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                            <div className="card-body">
                                <span className="pb-2 text-lg font-bold">{copynotes?.length || 0} Items</span>
                                {
                                    copynotes?.length > 0 ? <div>
                                        {
                                            copynotes?.map((item, i) => {
                                                return <p key={i} className='flex items-center justify-between p-2 pb-2 overflow-hidden rounded-md cursor-pointer hover:bg-red-50'>
                                                    <svg class="mr-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path></svg>
                                                    <span class="bg-yellow-100 text-yellow-800 text-sm  font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">{item?.tags}</span>
                                                    <span onClick={() => handelCopyDelete(item._id)}>✖</span>
                                                </p>
                                            })
                                        }
                                    </div> : <div className='flex items-center justify-center w-full'>
                                        <div className='flex flex-col items-center justify-center'>
                                            <GoLightBulb className='text-4xl text-gray-400' />
                                            <p className='pt-2 text-gray-400 text-md'>Notes you copy appear here</p>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>




                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li><a>{user?.displayName}</a> </li>
                            <li><a>{user?.email}</a></li>
                            <li onClick={handelLogOut}><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="flex flex-col drawer-content">
                    {/* Page content here */}
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="min-h-full p-4 mt-16 bg-white menu w-80 text-base-content lg:mt-0 lg:bg-transparent">
                        {/* Sidebar content here */}
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-[#feefc3] py-3 rounded-tl-lg rounded-br-[400px] rounded-tr-[400px] font-semibold" : " py-3 rounded-tl-lg rounded-br-[400px] rounded-tr-[400px] font-semibold"
                                }>
                                <svg className='mr-3' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path></svg>
                                Notes</NavLink>
                        </li>
                        <li className='py-2'>
                            <NavLink
                                to="/tags"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-[#feefc3] py-3 rounded-tl-lg rounded-br-[400px] rounded-tr-[400px] font-semibold" : " py-3 rounded-tl-lg rounded-br-[400px] rounded-tr-[400px] font-semibold"
                                }>
                                <svg className='mr-3' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path></svg>
                                Tags</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/trash"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "bg-[#feefc3] py-3 rounded-tl-lg rounded-br-[400px] rounded-tr-[400px] font-semibold" : " py-3 rounded-tl-lg rounded-br-[400px] rounded-tr-[400px] font-semibold"
                                }>
                                <svg className='mr-3' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path><path d="M9 8h2v9H9zm4 0h2v9h-2z"></path></svg>
                                Trash</NavLink>
                        </li>

                    </ul>

                </div>
            </div>
        </div>

    );
};

export default Dashboard;