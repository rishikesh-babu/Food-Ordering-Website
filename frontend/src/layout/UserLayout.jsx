import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/user/Header";
import Footer from "../components/user/FooterUser";
import { useDispatch, useSelector } from "react-redux";
import UserHeader from "../components/user/UserHeader";
import axiosInstance from "../config/axiosInstance";
import { clearUserData, saveUserData } from "../redux/features/userSlice";

function UserLayout() {
    const { isUserAuth } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        checkUser();
    }, []);

    function checkUser() {
        axiosInstance({
            method: "GET",
            url: "user/check-user",
        })
            .then((res) => {
                console.log("res :>> ", res);
                dispatch(saveUserData(res?.data?.data));
            })
            .catch((err) => {
                console.log("err :>> ", err);
                dispatch(clearUserData());
            });
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="fixed top-0 left-0 w-full z-10">
                {isUserAuth ? <UserHeader /> : <Header />}
            </header>
            <main className="flex-grow mt-20">
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export { UserLayout };
