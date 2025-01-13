import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import { saveUserData } from "../../redux/features/userSlice";

function UserLogin() {
    const [loginData, setLoginData] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const { isUserAuth } = useSelector((state) => state.admin);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                url: "/user/login",
                data: loginData,
            })
                .then((res) => {
                    console.log("res :>> ", res);
                    toast.success(res?.data?.message);
                    dispatch(saveUserData(res?.data?.data));
                    navigate("/");
                })
                .catch((err) => {
                    console.log("err :>> ", err);
                    toast.error(err.response.data.message);
                }),
            {
                loading: "Logging......",
            }
        );
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                        Welcome back! Access your favorite meals and enjoy effortless food ordering 
                        with a single click. Don't miss out on exciting offers tailored just for you.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
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
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    onChange={handleLoginData}
                                    placeholder="password"
                                    className="input input-bordered"
                                    required
                                />
                                <div className="flex justify-between mt-1">
                                    <button
                                        type="button"
                                        className="btn btn-xs btn-ghost"
                                        onClick={() => navigate('/signup')}
                                    >
                                        Signup?
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-xs btn-ghost"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? "Hide" : "Show"}
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

export default UserLogin;
