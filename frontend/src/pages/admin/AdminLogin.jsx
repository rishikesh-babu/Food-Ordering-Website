import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveAdminData } from "../../redux/features/adminSlice";
import { Eye, EyeOff } from "lucide-react";

function AdminLogin() {
    const [loginData, setLoginData] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const { isAdminAuth } = useSelector((state) => state.admin)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('isAdminAuth :>> ', isAdminAuth);
        isAuthorised()
    }, [isAdminAuth])

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    function isAuthorised() {
        if (isAdminAuth) {
            navigate('/admin/hotel')
        }
    }

    function handleLoginData(event) {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value,
        });
        console.log("loginData :>> ", loginData);
    }

    function handlelogin(event) {
        event.preventDefault();
        toast.promise(
            axiosInstance({
                method: "POST",
                url: "/admin/login",
                data: loginData,
            })
                .then((res) => {
                    console.log("res :>> ", res);
                    toast.success(res?.data?.message)
                    dispatch(saveAdminData(res?.data?.data))
                    navigate('/admin/hotel')
                })
                .catch((err) => {
                    console.log("err :>> ", err);
                    toast.error(err.response.data.message)
                }),
            {
                loading: 'Logging......'
            }
        )
    }
    console.log('isAdminAuth :>> ', isAdminAuth);
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse gap-12">
                    <div className="text-center lg:text-left sm:max-w-md">
                        <h1 className="text-5xl font-bold dark:text-white">Admin Login now!</h1>
                        <p className="py-6 text-wrap">
                            Access your dashboard to manage users, monitor orders, and keep things running smoothly.
                            Secure authentication ensures only authorized personnel can make changes.
                            Please log in to continue.
                        </p>
                    </div>

                    {/* Admin Login form */}
                    <div className="card p-6 bg-white dark:bg-gray-800 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold dark:text-gray-300">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleLoginData}
                                    placeholder="email"
                                    className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold dark:text-gray-300">Password</span>
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    onChange={handleLoginData}
                                    placeholder="password"
                                    className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                                    required
                                />
                                <div className="flex justify-end mt-1">
                                    <button
                                        type="button"
                                        className="btn btn-link text-gray-600 dark:text-gray-400 hover:scale-105 absolute top-40 right-6"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="text-gray-700 dark:text-gray-300" /> : <Eye className="text-gray-700 dark:text-gray-300" />}
                                    </button>
                                </div>
                            </div>
                            <div className="form-control">
                                <button
                                    onClick={handlelogin}
                                    type="submit"
                                    className="btn btn-primary w-full font-semibold bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors duration-300"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;
