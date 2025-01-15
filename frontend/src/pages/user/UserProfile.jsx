import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/axiosInstance'
import { ProfileModal } from '../../components/user/Modal'
import { LogoutButton } from '../../components/user/ButtonUser'

function UserProfile() {

    const [profileDetails, setProfileDetails] = useState({})

    useEffect(() => {
        getProfile()
    }, [])

    function imageModal() {
        document.getElementById("profile_modal").showModal()
    }

    function getProfile() {
        axiosInstance({
            method: "GET",
            url: 'user/profile'
        })
            .then((res) => {
                console.log('res :>> ', res);
                setProfileDetails(res?.data?.data)
            })
            .catch((err) => {
                console.log('err :>> ', err);
            })
    }

    return (

        <div className="flex flex-col items-center bg-gray-100 py-8">
            <div className="text-3xl font-semibold text-gray-800 mb-6">Profile</div>
            <div className="p-6 bg-white shadow-md rounded-lg max-w-md w-full">
                <div className="flex justify-center mb-6">
                    <ProfileModal image={profileDetails?.image} />
                    <img
                        onClick={imageModal}
                        className="w-32 h-32 rounded-full object-cover"
                        src={profileDetails?.image}
                        alt="Profile"
                    />
                </div>
                <div className="flex flex-col text-lg font-medium text-gray-700 space-y-4">
                    <div>
                        <span className="font-semibold">Name:</span> {profileDetails?.name || "N/A"}
                    </div>
                    <div>
                        <span className="font-semibold">Mobile:</span> {profileDetails?.mobile || "N/A"}
                    </div>
                    <div>
                        <span className="font-semibold">Email:</span> {profileDetails?.email || "N/A"}
                    </div>
                    <div>
                        <span className="font-semibold">Address:</span> {profileDetails?.address || "N/A"}
                    </div>
                </div>
                <div>
                    <LogoutButton />
                </div>
            </div>
        </div>
    )
}

export default UserProfile
