import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminHeader from '../components/admin/AdminHeader'
import AdminFooter from '../components/admin/AdminFooter'
import SideBar from '../components/admin/SideBar'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../config/axiosInstance'
import { clearAdminData, saveAdminData } from '../redux/features/adminSilce'
import toast from 'react-hot-toast'
import { Menu } from 'lucide-react'
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
                // console.log('res :>> ', res);
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
        <div className="min-h-screen bg-gray-100d  flex">
            {/* Sidebar */}
            <aside className={`bg-white shadow-lg fixed h-full transition-all ${sideBarToggle && isAdminAuth ? 'w-64' : 'w-0 overflow-hidden'} duration-300`}>
                <SideBar />
            </aside>

            {/* Main Content */}
            <main className="flex flex-col flex-grow ml-auto w-full transition-all duration-300" style={{ marginLeft: sideBarToggle && isAdminAuth ? '16rem' : '0' }}>
                {/* Admin Header */}
                <header className="shadow-md items-center">
                    <AdminHeader />
                </header>

                {/* Page Content */}
                <section className="flex-grow p-1">
                    <Outlet />
                </section>

                {/* Admin Footer */}
                <footer className=" shadow-inner">
                    <AdminFooter />
                </footer>
            </main>
        </div>
    )
}

export default AdminLayout
