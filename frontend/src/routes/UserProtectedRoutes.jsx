import React from 'react'
import { Outlet } from 'react-router-dom'

function UserProtectedRoutes() {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export { UserProtectedRoutes }
