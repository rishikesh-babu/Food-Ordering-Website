import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminHeader from '../components/admin/AdminHeader'
import AdminFooter from '../components/admin/AdminFooter'
import SideBar from '../components/admin/SideBar'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../config/axiosInstance'
import { clearAdminData, saveAdminData } from '../redux/features/adminSilce'
import toast from 'react-hot-toast'
console.log('This is admin layout')

function AdminLayout() {

    const { isAdminAuth, adminData } = useSelector((state) => state.admin)
    const { sideBarToggle } = useSelector((state) => state.sideBar)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        checkAdmin()
    }, [])

    function checkAdmin() {
        axiosInstance({
            method: 'GET',
            url: '/admin/check-admin',
        })
            .then((res) => {
                console.log('res :>> ', res);
                dispatch(saveAdminData(res?.data?.data))
                navigate('/admin/hotel')
            })
            .catch((err) => {
                console.log('err :>> ', err);
                dispatch(clearAdminData())
                toast.error(err?.response?.data?.message)
                navigate('/admin/login')
            })
    }

    return (

        // <div className="flex h-screen">
        //     {/* Sidebar - Animated & Scrollable */}
        //     <div className={`bg-gray-200 border-r shadow-lg overflow-y-auto transition-all duration-300 ${sideBarToggle && isAdminAuth ? "w-64" : "w-0 overflow-hidden"}`}>
        //         <SideBar />
        //     </div>

        //     {/* Main Content - Header Fixed, Body Scrollable */}
        //     <div className="flex flex-col overflow-y-auto">
        //         {/* Fixed Header */}
        //         <div className="fixed top-0 w-full bg-white shadow-lg z-10">
        //             <AdminHeader />
        //         </div>

        //         {/* Scrollable Content */}
        //         <div className="mt-16 p-4">
        //             <Outlet />
        //         </div>

        //         {/* Footer */}
        //         <div className="w-full bg-gray-100 shadow-inner">
        //             <AdminFooter />
        //         </div>
        //     </div>
        // </div>



        <div className='flex h-screen overflow-hidden'>
            {
                <div className={`bg-gray-200 overflow-y-auto  text-nowrap ${(sideBarToggle && isAdminAuth) ? 'w-64' : 'w-0 opacity-0'} duration-300`}>
                    <SideBar />
                </div>
            }
            <div className='flex flex-col overflow-y-auto w-screen'>
                <div className='fixed w-full shadow-lg '>
                    <AdminHeader />
                </div>
                <div className='flex-1 mt-20 w-full'>
                    <Outlet />
                </div>
                <div className='w-full'>
                    <AdminFooter />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
