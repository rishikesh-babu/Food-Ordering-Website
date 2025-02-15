import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import { ProfileModal } from "../../components/user/Modal";
import {
    EditProfileButton,
    LogoutButton,
} from "../../components/user/ButtonUser";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import getFetch from "../../hooks/getFetch";
import { saveUserData } from "../../redux/features/userSlice";
import { ProfilePicSkelton } from "../../components/user/Skelton";
import { useSelector } from "react-redux";

function UserProfile() {
    const [profileDetails, profilePicLoading, profilePicErr] = getFetch(
        "user/profile",
        saveUserData
    );
    const { userData } = useSelector((state) => state.user)
    const [selectedFile, setSelectedFile] = useState();

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    function imageModal() {
        document.getElementById("profile_modal").showModal();
    }

    function handleFile(value) {
        setSelectedFile(value);
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
        <div className="flex flex-col items-center bg-gray-100 pt-8 sm:py-9">
            <div className="text-3xl font-semibold text-gray-800 mb-8">Profile</div>
            <div className="py-6 sm:p-8 bg-white shadow-lg rounded-xl max-w-fit">
                {profilePicLoading ? (
                    <ProfilePicSkelton />
                ) : (
                    <div className="flex justify-center items-center gap-4 mb-6 relative">
                        <ProfileModal image={userData?.image} />
                        <div className="relative">
                            <img
                                onClick={imageModal}
                                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-2xl hover:scale-105 transition-transform duration-200 cursor-pointer"
                                src={userData?.image}
                                alt="Profile"
                            />
                        </div>
                    </div>
                )}
                <div className="flex flex-col bg-gray-100 p-6 rounded-lg shadow-xl ">
                    <div className="text-2xl font-bold text-gray-800 text-center border-b pb-4">
                        Profile Details
                    </div>
                    <div className="space-y-4 text-lg text-gray-700">
                        <div className="grid grid-cols-[75px_1fr] ">
                            <div className="font-semibold">Name:</div>
                            <div className="text-[16px] font-medium content-center ">{userData?.name || "N/A"}</div>
                        </div>
                        <div className="grid grid-cols-[75px_1fr] items-center">
                            <div className="font-semibold">Mobile:</div>
                            <div className="text-[16px] font-medium content-center ">
                                {userData?.mobile || "N/A"}
                            </div>
                        </div>
                        <div className="grid grid-cols-[75px_1fr] ">
                            <div className="font-semibold">Email:</div>
                            <div className="text-[16px] font-medium content-center break-words ">
                                {userData?.email || "N/A"}
                            </div>
                        </div>
                        <div className="grid grid-cols-[75px_1fr]">
                            <div className="font-semibold">Address:</div>
                            <div className="text-[16px] font-medium content-center ">
                                {userData?.address || "N/A"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Buttons Section */}
                <div className="flex justify-around sm:justify-between items-center mt-6 space-x-4">
                    <LogoutButton />
                    <Link to="/user/profile/edit">
                        <EditProfileButton />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
