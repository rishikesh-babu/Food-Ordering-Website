import React, { useEffect } from 'react'
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
        <div className='flex'>
            <div className='w-2/12 bg-gray-200 '>
                <SideBar />
            </div>
            <div className='w-full'>
                <div>
                    <AdminHeader />
                </div>
                <div className='min-h-96'>
                    <Outlet />
                </div>
                <div>
                    <AdminFooter />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
