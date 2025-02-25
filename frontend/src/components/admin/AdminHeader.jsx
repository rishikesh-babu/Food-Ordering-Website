import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleSideBar } from '../../redux/features/sideBarSlice'
import DarkMode from '../shared/DarkMode'

function AdminHeader() {

    const dispatch = useDispatch()

    return (
        <div className="p-4 flex items-center justify-between bg-white dark:bg-gray-800 shadow-md">
            {/* Sidebar Toggle Button */}
            <div className="flex items-center">
                <button
                    onClick={() => dispatch(toggleSideBar())}
                    className="btn btn-square btn-ghost hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-6 w-6 stroke-current text-gray-800 dark:text-gray-200"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>
            </div>

            {/* Title */}
            <div>
                <a className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 transition-colors">
                    Food Express Admin
                </a>
            </div>

            {/* Dark Mode Toggle */}
            <div>
                <DarkMode />
            </div>
        </div>

    )
}

export default AdminHeader
