import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Utensils, PlusSquare, List, LogOut } from "lucide-react";
import axiosInstance from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { clearAdminData } from '../../redux/features/adminSilce';

function SideBar() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLogout() {
        return
        toast.promise(
            axiosInstance({
                method: 'POST',
                url: 'admin/logout',
            })
                .then((res) => {
                    console.log('res :>> ', res);
                    toast.success(res?.data?.data?.message)
                    dispatch(clearAdminData())
                    navigate('/admin/login')
                })
                .catch((err) => {
                    console.log('err :>> ', err);
                    toast.error(err?.response?.data?.message)
                    dispatch(clearAdminData())
                    navigate('/admin/login')
                }),
            {
                loading: 'Logout....'
            }
        )
    }
    return (
        <div className="h-screen w-64 dark:bg-gray-900 dark:text-white p-5 flex flex-col space-y-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <nav className="flex-grow flex flex-col gap-y-5">
                <Link to="/admin/hotel" className="flex items-center space-x-2 p-2 hover:bg-gray-400 active:bg-gray-500 dark:active:bg-gray-600 dark:hover:bg-gray-700 rounded-md">
                    <Home size={20} />
                    <span>Hotel</span>
                </Link>
                <Link to="/admin/food" className="flex items-center space-x-2 p-2 hover:bg-gray-400 active:bg-gray-500 dark:active:bg-gray-600 dark:hover:bg-gray-700 rounded-md">
                    <Utensils size={20} />
                    <span>Food Items</span>
                </Link>
                <Link to="/admin/create-hotel" className="flex items-center space-x-2 p-2 hover:bg-gray-400 active:bg-gray-500 dark:active:bg-gray-600 dark:hover:bg-gray-700 rounded-md">
                    <PlusSquare size={20} />
                    <span>Create Hotel</span>
                </Link>
                <Link to="/admin/orders" className="flex items-center space-x-2 p-2 hover:bg-gray-400 active:bg-gray-500 dark:active:bg-gray-600 dark:hover:bg-gray-700 rounded-md">
                    <List size={20} />
                    <span>View Orders</span>
                </Link>
                <div onClick={handleLogout} className="mt-auto flex items-center space-x-2 p-2 cursor-pointer bg-red-500 active:bg-red-700 rounded-md">
                    <LogOut size={20} />
                    <span className='text-lg font-semibold'>Logout</span>
                </div>
            </nav>
        </div>
    );
}

export default SideBar;