import React, { useEffect, useState } from 'react'
import { ImageTag, InputTag } from '../../components/admin/InputAdmin'
import { BackButton, UpdateProfile } from '../../components/user/ButtonUser'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../config/axiosInstance'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { saveUserData } from '../../redux/features/userSlice'

function UserProfileEdit() {

    const [profileDetails, setProfileDetails] = useState({})
    const [selectedFile, setSelectedFile] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    function handleProfile(name, value) {
        setProfileDetails({
            ...profileDetails,
            [name]: value
        })
    }

    function handleFile(value) {
        setSelectedFile(value)
    }

    function handleSubmit(event) {
        event.preventDefault()

        console.log('profileDetails :>> ', profileDetails);
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

    return (

        <div>
            {/* Title */}
            <div className="text-4xl font-semibold text-center mb-7">
                Edit Profile
            </div>

            {/* Form Content */}
            <div className="p-3 m-3 mb-8 w-fit flex flex-col gap-6 border rounded-lg drop-shadow-2xl sm:bg-gray-100 sm:mx-auto sm:shadow-xl sm:p-9">
                <div className="space-y-2">
                    <div className="text-lg font-medium text-gray-700 ">
                        Name
                    </div>
                    <InputTag
                        onInputChange={handleProfile}
                        name={'name'}
                        placeholder={'Enter user name'}
                        type={'text'}
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <div className="text-lg font-medium text-gray-700">
                        Email
                    </div>
                    <InputTag
                        onInputChange={handleProfile}
                        name={'email'}
                        placeholder={'Enter email'}
                        type={'email'}
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <div className="text-lg font-medium text-gray-700">
                        Mobile No.
                    </div>
                    <InputTag
                        onInputChange={handleProfile}
                        name={'mobile'}
                        placeholder={'Enter mobile number'}
                        type={'text'}
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <div className="text-lg font-medium text-gray-700">
                        Address
                    </div>
                    <InputTag
                        onInputChange={handleProfile}
                        name={'address'}
                        placeholder={'Enter address'}
                        type={'text'}
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Profile Picture Section */}
                <div className="space-y-2">
                    <div className="text-lg font-medium text-gray-700">
                        Profile Pic
                    </div>
                    <ImageTag
                        onInputChange={handleFile}
                        className="p-3 border border-gray-300 rounded-lg w-full md:w-1/2"
                    />
                </div>

                {/* Buttons Section */}
                <div className=" flex justify-between">
                    {/* Update Profile Button */}
                    <UpdateProfile
                        handleSubmit={handleSubmit}
                        className="px-6 py-3 bg-blue-600 text-white font-medium text-lg rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    />

                    {/* Back Button */}
                    <BackButton />
                </div>
            </div>
        </div>


        // <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        //     <div className="text-3xl font-semibold text-center text-gray-800 mb-6">
        //         Edit Profile
        //     </div>
        //     <div className="flex flex-col gap-6">
        //         {/* <div className="space-y-2">
        //             <div className="text-lg font-medium text-gray-700">
        //                 Name
        //             </div>
        //             <InputTag
        //                 onInputChange={handleProfile}
        //                 name={'name'}
        //                 placeholder={'Enter user name'}
        //                 type={'text'}
        //                 className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        //             />
        //         </div>

        //         <div className="space-y-2">
        //             <div className="text-lg font-medium text-gray-700">
        //                 Email
        //             </div>
        //             <InputTag
        //                 onInputChange={handleProfile}
        //                 name={'email'}
        //                 placeholder={'Enter email'}
        //                 type={'email'}
        //                 className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        //             />
        //         </div>

        //         <div className="space-y-2">
        //             <div className="text-lg font-medium text-gray-700">
        //                 Mobile No.
        //             </div>
        //             <InputTag
        //                 onInputChange={handleProfile}
        //                 name={'mobile'}
        //                 placeholder={'Enter mobile number'}
        //                 type={'text'}
        //                 className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        //             />
        //         </div>

        //         <div className="space-y-2">
        //             <div className="text-lg font-medium text-gray-700">
        //                 Address 
        //             </div>
        //             <InputTag
        //                 onInputChange={handleProfile}
        //                 name={'address'}
        //                 placeholder={'Enter address'}
        //                 type={'text'}
        //                 className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        //             />
        //         </div> */}

        //         <div className="space-y-2">
        //             <div className="text-lg font-medium text-gray-700">
        //                 Profile Pic
        //             </div>
        //             <ImageTag
        //                 onInputChange={handleFile}
        //                 className="p-3 border border-gray-300 rounded-lg"
        //             />
        //         </div>
        //         <div className="mt-6 flex flex-col md:flex-row justify-around items-center gap-4">
        //             {/* Update Profile Button */}
        //             <UpdateProfile
        //                 handleSubmit={handleSubmit}
        //                 className="px-6 py-3 bg-blue-600 text-white font-medium text-lg rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        //             />
        //             {/* Back Button */}
        //             <BackButton />
        //         </div>

        //     </div>
        // </div>
    )
}

export default UserProfileEdit
