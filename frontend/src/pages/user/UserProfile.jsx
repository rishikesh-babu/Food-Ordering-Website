import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/axiosInstance'
import { ProfileModal } from '../../components/user/Modal'
import { EditProfileButton, LogoutButton } from '../../components/user/ButtonUser'
import { Edit } from 'lucide-react'
import { Link } from 'react-router-dom'
import getFetch from '../../hooks/getFetch'
import { saveUserData } from '../../redux/features/userSlice'
import { ProfilePicSkelton } from '../../components/user/Skelton'

function UserProfile() {

    const [profileDetails, profilePicLoading, profilePicErr] = getFetch('user/profile', saveUserData)
    const [selectedFile, setSelectedFile] = useState()

    function imageModal() {
        document.getElementById("profile_modal").showModal()
    }

    function handleFile(value) {
        setSelectedFile(value)
    }

    // function getProfile() {
    //     axiosInstance({
    //         method: "GET",
    //         url: 'user/profile'
    //     })
    //         .then((res) => {
    //             console.log('res :>> ', res);
    //             setProfileDetails(res?.data?.data)
    //         })
    //         .catch((err) => {
    //             console.log('err :>> ', err);
    //         })
    // }

    return (

        <div className="flex flex-col items-center bg-gray-100 py-8">
            <div className="text-3xl font-semibold text-gray-800 mb-6">Profile</div>
            <div className="p-6 bg-white shadow-md rounded-lg max-w-md w-full">
                {
                    profilePicLoading ? (
                        <ProfilePicSkelton />
                    ) : (
                        <div className="flex justify-center items-center gap-4 mb-6 relative">
                            {/* Profile Modal */}
                            <ProfileModal image={profileDetails?.image} />

                            {/* Profile Image */}
                            <div className="relative">
                                <img
                                    onClick={imageModal}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer"
                                    src={profileDetails?.image}
                                    alt="Profile"
                                />
                            </div>
                        </div>
                    )
                }

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
                <div className='flex flex-row items-center justify-between flex-wrap'>
                    <LogoutButton />
                    <Link to={'/user/profile/edit'}>
                        <EditProfileButton />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
