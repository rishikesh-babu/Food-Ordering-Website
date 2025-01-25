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

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Signup
                </h1>
                <form className="flex flex-col gap-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-600 mb-2"
                        >
                            Name
                        </label>
                        <LoginInput
                            handleData={handleSignupData}
                            name={'name'}
                            type="text"
                            placeholder="Enter Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-600 mb-2"
                        >
                            Email
                        </label>
                        <LoginInput
                            handleData={handleSignupData}
                            name={'email'}
                            type="email"
                            placeholder="Enter Email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-600 mb-2"
                        >
                            Phone No
                        </label>
                        <LoginInput
                            handleData={handleSignupData}
                            name={'mobile'}
                            type="text"
                            placeholder="Enter phone number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-600 mb-2"
                        >
                            Address
                        </label>
                        <LoginInput
                            handleData={handleSignupData}
                            name={'address'}
                            type="text"
                            placeholder="Enter Address"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-600 mb-2"
                        >
                            Password
                        </label>
                        <LoginInput
                            handleData={handleSignupData}
                            name={'password'}
                            type="password"
                            placeholder="Enter Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-600 mb-2"
                        >
                            Confirm Password
                        </label>
                        <LoginInput
                            handleData={handleSignupData}
                            name={'confirmPassword'}
                            type="password"
                            placeholder="Re-enter password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* <div className="text-sm text-center text-gray-500 mt-4">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Login
                        </a>
                    
                    </div> */}
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
