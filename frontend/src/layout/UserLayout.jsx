import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/user/Header'
import Footer from '../components/user/FooterUser'
import { useDispatch, useSelector } from 'react-redux'
import UserHeader from '../components/user/UserHeader'
import axiosInstance from '../config/axiosInstance'
import { saveUserData } from '../redux/features/userSlice'

function UserLayout() {

    const { isUserAuth } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        checkUser()
    }, [])
    function checkUser() {
        axiosInstance({
            method: 'GET',
            url: 'user/check-user',
        })
            .then((res) => {
                console.log('res :>> ', res);
                console.log('res?.data?.data :>> ', res?.data?.data);
                dispatch(saveUserData(res?.data?.data))
            })
            .catch((err) => {
                console.log('err :>> ', err);
            })
    }

    return (
        <div>
            <div>
                {isUserAuth ? <UserHeader /> : <Header />}
            </div>
            <div className='min-h-96'>
                <Outlet />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export { UserLayout }
