import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminHeader from '../components/admin/AdminHeader'
import AdminFooter from '../components/admin/AdminFooter'
import SideBar from '../components/admin/SideBar'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../config/axiosInstance'
import { clearAdminData, saveAdminData } from '../redux/features/adminSlice'
import toast from 'react-hot-toast'

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
                // navigate('/admin/hotel')
            })
            .catch((err) => {
                console.log('err :>> ', err);
                dispatch(clearAdminData())
                toast.error(err?.response?.data?.message)
                navigate('/admin/login')
            })
    }

    return (
        <div className="min-h-screen overflow-x-hidden flex">
            {/* Sidebar */}
            <aside className={`shadow-lg fixed h-full transition-all ${sideBarToggle && isAdminAuth ? 'w-64' : 'w-0 overflow-hidden'} duration-300`}>
                <SideBar />
            </aside>

            {/* Main Content */}
            <main className="flex flex-col flex-grow ml-auto w-full transition-all duration-300" style={{ marginLeft: sideBarToggle && isAdminAuth ? '16rem' : '0' }}>
                {/* Admin Header */}
                <header>
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
