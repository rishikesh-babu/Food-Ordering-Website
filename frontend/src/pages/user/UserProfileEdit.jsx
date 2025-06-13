import React, { useEffect, useState } from 'react'
import { ImageTag, InputTag } from '../../components/admin/InputAdmin'
import { BackButton, UpdateProfile } from '../../components/user/ButtonUser'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../config/axiosInstance'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { saveUserData } from '../../redux/features/userSlice'

function UserProfileEdit() {

    const { userData } = useSelector((state) => state.user);
    const [profileDetails, setProfileDetails] = useState({})
    const [selectedFile, setSelectedFile] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        window.scroll(0, 0)
        setProfileDetails({
            name: userData?.name || '',
            // email: userData?.email || '',
            address: userData?.address || '',
            mobile: userData?.mobile || '',
        })
    }, [userData])

    function handleProfile(event) {
        setProfileDetails({
            ...profileDetails,
            [event.target.name]: event.target.value 
        })
    }

    function handleFile(value) {
        setSelectedFile(value)
    }

    function handleSubmit(event) {
        event.preventDefault()

        // console.log('profileDetails :>> ', profileDetails);
        const formData = new FormData()
        formData.append('image', selectedFile)
        formData.append('name', profileDetails?.name || '');
        formData.append('email', profileDetails?.email || '');
        formData.append('mobile', profileDetails?.mobile || '');
        formData.append('address', profileDetails?.address || '');

        toast.promise(
            axiosInstance({
                method: 'PUT',
                url: '/user/update-profile',
                data: formData,
            })
                .then((res) => {
                    console.log('res :>> ', res);
                    navigate('/user/profile')
                    dispatch(saveUserData(res?.data?.data))
                    toast.success(res?.data?.message)
                })
                .catch((err) => {
                    console.log('err :>> ', err);
                    toast.error(err?.response?.data?.message)
                }),
            {
                loading: 'Updating profile please wait...'
            }
        )
    }

    console.log('profileDetails :>> ', profileDetails);

    return (
        <div className="p-4 sm:p-6 md:p-8">
            {/* Title */}
            <div className="text-4xl font-semibold text-center mb-7 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                Edit Profile
            </div>

            {/* Form Content */}
            <div className="p-5 sm:p-9 m-3 mb-8 w-full max-w-lg mx-auto flex flex-col gap-6 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow-2xl dark:shadow-gray-700 transition-all duration-300">

                {/* Name Field */}
                <div className="space-y-2">
                    <div className="text-lg font-medium text-gray-700 dark:text-gray-300">Name</div>
                    <InputTag
                        onInputChange={handleProfile}
                        value={profileDetails.name}
                        name={'name'}
                        placeholder={'Enter user name'}
                        type={'text'}
                        classname="p-3 border border-gray-300 focus:border-blue-400 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-700 transition-all duration-200"
                    />
                </div>

                {/* Mobile No. Field */}
                <div className="space-y-2">
                    <div className="text-lg font-medium text-gray-700 dark:text-gray-300">Mobile No.</div>
                    <InputTag
                        onInputChange={handleProfile}
                        value={profileDetails.mobile}
                        name={'mobile'}
                        placeholder={'Enter mobile number'}
                        type={'text'}
                        classname="p-3 border border-gray-300 focus:border-blue-400 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-700 transition-all duration-200"
                    />
                </div>

                {/* Address Field */}
                <div className="space-y-2">
                    <div className="text-lg font-medium text-gray-700 dark:text-gray-300">Address</div>
                    <InputTag
                        onInputChange={handleProfile}
                        value={profileDetails.address}
                        name={'address'}
                        placeholder={'Enter address'}
                        type={'text'}
                        classname="p-3 border border-gray-300 focus:border-blue-400 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-700 transition-all duration-200"
                    />
                </div>

                {/* Profile Picture Section */}
                <div className="space-y-2">
                    <div className="text-lg font-medium text-gray-700 dark:text-gray-300">Profile Pic</div>
                    <ImageTag
                        onInputChange={handleFile}
                        className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg w-full md:w-1/2 
                           bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    />
                </div>

                {/* Buttons Section */}
                <div className="flex justify-between">
                    {/* Update Profile Button */}
                    <UpdateProfile
                        handleSubmit={handleSubmit}
                        className="px-6 py-3text-white font-medium text-lg rounded-lg shadow-md"
                    />

                    {/* Back Button */}
                    <BackButton className="px-6 py-3 bg-gray-400 text-gray-900 font-medium text-lg rounded-lg shadow-md"
                    />
                </div>
            </div>
        </div>

    )
}

export default UserProfileEdit
