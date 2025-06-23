import React, { useEffect } from "react";
import { ProfileModal } from "../../components/user/Modal";
import { EditProfileButton, LogoutButton, } from "../../components/user/ButtonUser";
import { Link } from "react-router-dom";
import getFetch from "../../hooks/getFetch";
import { saveUserData } from "../../redux/features/userSlice";
import { useSelector } from "react-redux";

function UserProfile() {
    const [profileDetails, profilePicLoading, profilePicErr] = getFetch(
        "user/profile",
        saveUserData
    );
    const { userData } = useSelector((state) => state.user)

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    function imageModal() {
        document.getElementById("profile_modal").showModal();
    }

    const userFields = [
        { label: 'Name', value: userData?.name },
        { label: 'Mobile', value: userData?.mobile },
        { label: 'Email', value: userData?.email },
        { label: 'Address', value: userData?.address },
    ];

    return (
        <div className="py-8 px-1 sm:py-9 flex flex-col items-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <div className="py-6 sm:p-8 bg-white dark:bg-gray-800 shadow-lg dark:shadow-md rounded-xl max-w-fit transition-colors duration-300">
                <div className="flex justify-center items-center gap-4 mb-6 relative">
                    <ProfileModal image={userData?.image} />

                    <div className="relative">
                        <img
                            onClick={imageModal}
                            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 dark:border-blue-400 shadow-2xl hover:scale-105 transition-transform duration-200 cursor-pointer"
                            src={userData?.image}
                            alt="Profile"
                        />
                    </div>
                </div>

                <div className="flex flex-col bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-xl dark:shadow-md transition-colors duration-300">
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center border-b-2 dark:border-gray-600 pb-4">
                        Profile Details
                    </div>

                    <div className="space-y-4 text-gray-700">
                        {userFields.map(({ label, value }) => (
                            <div key={label} className="grid grid-cols-[72px_1fr] gap-2">
                                <div className="text-lg font-semibold dark:text-gray-400">{label}:</div>
                                <div className="text-[16px] dark:text-gray-300 font-medium break-words">{value || 'N/A'}</div>
                            </div> 
                        ))}
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
