import React, { useEffect, useState } from "react";
import getFetch from "../../hooks/getFetch";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";

function ViewUser() {
    const [userData, setUserData] = useState();
    const [fetchData, isUserDataLoading, userDataError] = getFetch(
        "/admin/get-all-user"
    );

    useEffect(() => {
        window.scroll(0, 0);
        if (fetchData) {
            setUserData(fetchData);
        }
    }, [fetchData]);

    function handleUserStatus(url, userId) {
        toast.promise(
            axiosInstance({
                method: "PUT",
                url,
                data: { userId },
            })
                .then((res) => {
                    console.log("res :>> ", res);
                    toast.success(res?.data?.message);
                    setUserData((prevUser) =>
                        prevUser?.map((user) =>
                            user?._id === res?.data?.data?._id
                                ? { ...user, userStatus: res?.data?.data?.userStatus }
                                : user
                        )
                    );
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                    console.log("err :>> ", err);
                }),
            {
                loading: "Please wait...",
            }
        );
    }
    console.log("userData :>> ", userData);
    return (
        <div className="mb-5">
            <div className="text-3xl font-semibold text-center m-5">Users</div>
            <div className="max-w-3xl mx-auto">
                {userData?.map((item) => (
                    <div className="flex items-center gap-2 border rounded-lg p-2">
                        <div>
                            <img
                                className="size-20 rounded-full object-cover"
                                src={item?.image}
                                alt=""
                            />
                        </div>
                        <div className="font-semibold">{item?.name}</div>
                        <div className="flex-grow flex justify-end gap-2">
                            {item?.userStatus === "active" ? (
                                <button
                                    onClick={() =>
                                        handleUserStatus("/admin/block-user", item?._id)
                                    }
                                    className="bg-green-500 text-white px-4 py-1 rounded w-24"
                                >
                                    Active
                                </button>
                            ) : (
                                <button
                                    onClick={() =>
                                        handleUserStatus("/admin/active-user", item?._id)
                                    }
                                    className="bg-red-500 text-white px-4 py-1 rounded w-24"
                                >
                                    Blocked
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ViewUser;
