import React, { useState } from "react";
import { LoginInput } from "../../components/user/Input";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUserData } from "../../redux/features/userSlice";

function UserSignup() {

    const [signupData, setSignupData] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleSignupData(event) {
        setSignupData({
            ...signupData,
            [event.target.name]: event.target.value
        })
    }

    function handleSignup(event) {
        event.preventDefault()
        console.log('signupData :>> ', signupData);

        if ((signupData.name || signupData.mobile || signupData.email || signupData.address || signupData.address || signupData.password) === undefined) {
            toast.error('All fields are required ')
            return
        }

        if (signupData.password !== signupData.confirmPassword) {
            toast.error("Enter correct password")
            return
        }

        toast.promise(
            axiosInstance({
                method: 'POST',
                url: '/user/signup',
                data: signupData,
            })
                .then((res) => {
                    console.log('res :>> ', res);
                    dispatch(saveUserData(res?.data?.data))
                    toast.success(res?.data?.message)
                    navigate('/')
                })
                .catch((err) => {
                    console.log('err :>> ', err);
                    toast.error(err?.response?.data?.message)
                }),
            {
                loading: 'Wait....'
            }
        )
    }

    const labelStyle = 'mb-2 text-xl font-medium block dark:text-gray-300'
    const inputStyle = "p-3 w-full border border-gray-300 focus:border-blue-400 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-700 transition-all duration-200"

    return (
        <div className="sm:py-8 flex justify-center items-center">
            <div className="p-8 w-full max-w-md dark:text-gray-100 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-2xl dark:shadow-gray-700">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Signup
                </h1>
                <form className="flex flex-col gap-5">
                    <div>
                        <label
                            htmlFor="name"
                            className={labelStyle}
                        >
                            Name
                        </label>
                        <LoginInput
                            handleData={handleSignupData}
                            name={'name'}
                            type="text"
                            placeholder="Enter Name"
                            className={inputStyle}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className={labelStyle}
                        >
                            Email
                        </label>
                        <LoginInput
                            handleData={handleSignupData}
                            name={'email'}
                            type="email"
                            placeholder="Enter Email"
                            className={inputStyle}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="phone"
                            className={labelStyle}
                        >
                            Phone No
                        </label>
                        <LoginInput
                            handleData={handleSignupData}
                            name={'mobile'}
                            type="text"
                            placeholder="Enter phone number"
                            className={inputStyle}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="address"
                            className={labelStyle}
                        >
                            Address
                        </label>
                        <LoginInput
                            handleData={handleSignupData}
                            name={'address'}
                            type="text"
                            placeholder="Enter Address"
                            className={inputStyle}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className={labelStyle}
                        >
                            Password
                        </label>
                        <LoginInput
                            handleData={handleSignupData}
                            name={'password'}
                            type="password"
                            placeholder="Enter Password"
                            className={inputStyle}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className={labelStyle}
                        >
                            Confirm Password
                        </label>
                        <LoginInput
                            handleData={handleSignupData}
                            name={'confirmPassword'}
                            type="password"
                            placeholder="Re-enter password"
                            className={inputStyle}
                        />
                    </div>
                    <div className="mt-3">
                        <button
                            type="submit"
                            onClick={handleSignup}
                            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
                        >
                            Signup
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserSignup;
