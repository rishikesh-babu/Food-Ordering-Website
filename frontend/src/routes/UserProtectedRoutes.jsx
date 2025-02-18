import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

function UserProtectedRoutes() {

    const { isUserAuth } = useSelector((state) => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        checkUser()
    }, [isUserAuth])

    function checkUser() {
        if (!isUserAuth) {
            navigate('/login')
        }
    }
    
    return (
        <div>
            <Outlet />
        </div>
    )
}

export { UserProtectedRoutes }
