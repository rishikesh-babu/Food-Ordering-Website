import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleSideBar } from '../../redux/features/sideBarSlice'

function AdminHeader() {

    const dispatch = useDispatch()

    return (
        <div className="navbar bg-base-100">
            <div className="flex-none">
                <button onClick={() => dispatch(toggleSideBar())} className="btn btn-square btn-ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-5 w-5 stroke-current">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
            <div className="flex-1">
                <a className="btn btn-ghost text-2xl font-semibold">Food Express Admin </a>
            </div>
        </div>
    )
}

export default AdminHeader
