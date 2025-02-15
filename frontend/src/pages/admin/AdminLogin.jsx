import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveAdminData } from "../../redux/features/adminSilce";
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
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6 text-wrap">
                            Access your dashboard to manage users, monitor orders, and keep things running smoothly.
                            Secure authentication ensures only authorized personnel can make changes.
                            Please log in to continue.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleLoginData}
                                    placeholder="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Password</span>
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    onChange={handleLoginData}
                                    placeholder="password"
                                    className="input input-bordered"
                                    required
                                />
                                <div className="flex justify-end mt-1">
                                    <button
                                        type="button"
                                        className="btn btn-link text-gray-600 hover:scale-105 absolute top-40 right-7"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff /> : <Eye />}
                                    </button>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    onClick={handlelogin}
                                    type="submit"
                                    className="btn btn-primary"
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
