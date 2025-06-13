import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Utensils, PlusSquare, List, LogOut } from "lucide-react";
import axiosInstance from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { clearAdminData } from '../../redux/features/adminSlice';
import { People } from '@mui/icons-material';
import { toggleSideBar } from '../../redux/features/sideBarSlice';

function SideBar() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLogout() {
        toast.promise(
            axiosInstance({
                method: 'POST',
                url: 'admin/logout',
            })
                .then((res) => {
                    console.log('res :>> ', res);
                    toast.success(res?.data?.message)
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

    function closeSideBar() {
        if (window.innerWidth < 571) {
            dispatch(toggleSideBar())
        }
    }

    const sideBarContents = [
        {
            link: '/admin/hotel',
            label: 'Hotel',
            element: <Home size={20} />
        },
        {
            link: '/admin/food',
            label: 'Food',
            element: <Utensils size={20} />
        },
        {
            link: '/admin/create-hotel',
            label: 'Create Hotel',
            element: <PlusSquare size={20} />
        },
        {
            link: '/admin/create-food',
            label: 'Create Food',
            element: <PlusSquare size={20} />
        },
        {
            link: '/admin/orders',
            label: 'View Orders',
            element: <List size={20} />
        },
        {
            link: '/admin/view-user',
            label: 'View User',
            element: <People size={20} />
        },
    ]
    const sideBarContentStyle = 'flex items-center space-x-2 p-2 hover:bg-gray-400 active:bg-gray-500 dark:active:bg-gray-600 dark:hover:bg-gray-700 rounded-md'

    return (
        <div className="h-full w-64 rounded-md bg-gray-300 dark:bg-gray-900 dark:text-white p-5 flex flex-col space-y-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <nav className="flex-grow flex flex-col gap-y-5 font-semibold">
                {sideBarContents.map((item, index) => (
                    <Link
                        to={item.link}
                        className="p-2 flex items-center gap-2 transition-all duration-200 hover:bg-gray-400 active:bg-gray-500 dark:active:bg-gray-600 dark:hover:bg-gray-700 rounded-md"
                        key={index}
                        onClick={closeSideBar}
                    >
                        {item.element}
                        <span>{item.label}</span>
                    </Link>
                ))}
                <div
                    onClick={handleLogout}
                    className="mt-auto flex items-center space-x-2 p-2 cursor-pointer bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-md"
                >
                    <LogOut size={20} />
                    <span className="text-lg font-semibold">Logout</span>
                </div>
            </nav>
        </div>
    );
}

export default SideBar;