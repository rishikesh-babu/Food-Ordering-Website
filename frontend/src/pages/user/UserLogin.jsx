import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import { saveUserData } from "../../redux/features/userSlice";
import { Eye, EyeOff } from "lucide-react";

function UserLogin() {
    const [loginData, setLoginData] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const { isUserAuth } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isUserAuth) {
            navigate("/");
        }
        window.scroll(0, 0)
    }, [isUserAuth]);

    function handleLoginData(event) {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value,
        });
    }

    function handleLogin(event) {
        event.preventDefault();
        toast.promise(
            axiosInstance({
                method: "POST",
                url: "/user/login",
                data: loginData,
            })
                .then((res) => {
                    toast.success(res?.data?.message);
                    dispatch(saveUserData(res?.data?.data));
                    navigate("/");
                })
                .catch((err) => {
                    toast.error(err.response?.data?.message || "Login failed.");
                }),
            {
                loading: "Logging in...",
            }
        );
    }

    return (
        // <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
        //     <div className="hero-content flex-col lg:flex-row-reverse gap-12">
        //         {/* Hero Text */}
        //         <div className="text-center lg:text-left max-w-md">
        //             <h1 className="text-5xl font-bold ">Login Now!</h1>
        //             <p className="py-6 text-gray-600 dark:text-gray-500">
        //                 Welcome back! Access your favorite meals and enjoy effortless food ordering
        //                 with a single click. Don't miss out on exciting offers tailored just for you.
        //             </p>
        //         </div>

        //         {/* Login Form */}
        //         <div className="card bg-white dark:bg-gray-600 w-full max-w-sm shadow-lg rounded-lg p-6">
        //             <form onSubmit={handleLogin} className="space-y-4">
        //                 {/* Email Input */}
        //                 <div className="form-control">
        //                     <label className="label">
        //                         <span className="label-text font-semibold dark:text-gray-200">Email</span>
        //                     </label>
        //                     <input
        //                         type="email"
        //                         name="email"
        //                         onChange={handleLoginData}
        //                         placeholder="Enter your email"
        //                         className="input input-bordered w-full dark:text-gray-200"
        //                         required
        //                     />
        //                 </div>

        //                 {/* Password Input */}
        //                 <div className="form-control">
        //                     <label className="label">
        //                         <span className="label-text font-semibold dark:text-gray-200">Password</span>
        //                     </label>
        //                     <input
        //                         type={showPassword ? "text" : "password"}
        //                         name="password"
        //                         onChange={handleLoginData}
        //                         placeholder="Enter your password"
        //                         className="input input-bordered w-full dark:text-gray-200"
        //                         required
        //                     />
        //                     <div className="flex justify-between items-center mt-2 text-sm">
        //                         <button
        //                             type="button"
        //                             className="btn btn-link text-gray-600 hover:text-gray-800"
        //                             onClick={() => navigate("/signup")}
        //                         >
        //                             Signup?
        //                         </button>
        //                         <button
        //                             type="button"
        //                             className="btn btn-link text-gray-600 hover:scale-105 absolute top-40 right-4"
        //                             onClick={() => setShowPassword(!showPassword)}
        //                         >
        //                             {showPassword ? <EyeOff /> : <Eye />}
        //                         </button>
        //                     </div>
        //                 </div>

        //                 {/* Login Button */}
        //                 <div className="form-control mt-6">
        //                     <button
        //                         type="submit"
        //                         className="btn btn-primary w-full font-semibold"
        //                     >
        //                         Login
        //                     </button>
        //                 </div>
        //             </form>
        //         </div>
        //     </div>
        // </div>




        <div className="hero bg-base-200 dark:bg-gray-900 min-h-screen flex items-center justify-center transition-colors duration-300">
            <div className="hero-content flex-col lg:flex-row-reverse gap-12">
                {/* Hero Text */}
                <div className="text-center lg:text-left max-w-md">
                    <h1 className="text-5xl font-bold text-gray-800 dark:text-white">Login Now!</h1>
                    <p className="py-6 text-gray-600 dark:text-gray-400">
                        Welcome back! Access your favorite meals and enjoy effortless food ordering
                        with a single click. Don't miss out on exciting offers tailored just for you.
                    </p>
                </div>

                {/* Login Form */}
                <div className="card bg-white dark:bg-gray-800 w-full max-w-sm shadow-lg rounded-lg p-6 transition-colors duration-300">
                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Email Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-gray-700 dark:text-gray-300">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleLoginData}
                                placeholder="Enter your email"
                                className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold text-gray-700 dark:text-gray-300">Password</span>
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                onChange={handleLoginData}
                                placeholder="Enter your password"
                                className="input input-bordered w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                                required
                            />
                            <div className="flex justify-between items-center mt-2 text-sm">
                                <button
                                    type="button"
                                    className="btn btn-link text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                                    onClick={() => navigate("/signup")}
                                >
                                    Signup?
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-link text-gray-600 dark:text-gray-400 hover:scale-105 absolute top-40 right-4"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="text-gray-700 dark:text-gray-300" /> : <Eye className="text-gray-700 dark:text-gray-300" />}
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <div className="form-control mt-6">
                            <button
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
    );
}

export default UserLogin;