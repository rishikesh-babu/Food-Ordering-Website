import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import axiosInstance from '../config/axiosInstance'
import { saveAdminData } from '../redux/features/adminSlice'
import AdminLogin from '../pages/admin/AdminLogin'

function AdminProtectedRoutes() {

    const { isAdminAuth, adminData } = useSelector((state) => state.admin)
    const navigate = useNavigate()

    useEffect(() => {
        isAuthorised()
    }, [isAdminAuth])

    function isAuthorised() {
        if (!isAdminAuth) {
            navigate('/admin/login')
        }
    }

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default AdminProtectedRoutes
