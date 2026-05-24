import React, { useEffect, useState } from "react";
import getFetch from "../../hooks/getFetch";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";
import { Users, Mail, Phone, MapPin, UserCheck, UserX, Search, ShieldCheck, ShieldAlert } from "lucide-react";

function ViewUser() {
    const [userData, setUserData] = useState();
    const [fetchData, isUserDataLoading, userDataError] = getFetch("/admin/get-all-user");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        // window.scroll(0, 0);
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
                loading: "Updating status...",
            }
        );
    }

    // Stats calculations
    const totalUsers = userData?.length || 0;
    const activeUsers = userData?.filter((u) => u.userStatus === "active").length || 0;
    const blockedUsers = userData?.filter((u) => u.userStatus === "blocked").length || 0;

    // Filtered list
    const filteredUsers = userData?.filter((user) => {
        const query = searchQuery.toLowerCase();
        return (
            user?.name?.toLowerCase().includes(query) ||
            user?.email?.toLowerCase().includes(query) ||
            user?.mobile?.toLowerCase().includes(query)
        );
    });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 transition-colors duration-300 relative overflow-hidden w-full">
            {/* Ambient Background Decorative Blobs */}
            <div className="absolute top-1/4 left-10 w-96 h-96 bg-orange-400/5 dark:bg-orange-600/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-rose-400/5 dark:bg-rose-600/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2 font-outfit">
                            <Users className="w-8 h-8 text-orange-500" />
                            <span>User Management</span>
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Monitor account registrations, roles, and status configurations.
                        </p>
                    </div>

                    {/* Search bar */}
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-450 dark:text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search name, email, phone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm text-sm focus:outline-none focus:border-orange-500/50 dark:focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 dark:focus:ring-orange-500/10 transition-all dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                        />
                    </div>
                </div>

                {/* Stats Widgets */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    {/* Total Users Widget */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-5 rounded-3xl shadow-sm flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                        <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl">
                            <Users size={24} />
                        </div>
                        <div>
                            <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">Total Members</span>
                            <span className="text-2xl font-black text-slate-800 dark:text-white font-outfit">{isUserDataLoading ? "..." : totalUsers}</span>
                        </div>
                    </div>

                    {/* Active Widget */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-5 rounded-3xl shadow-sm flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-2xl">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">Active Users</span>
                            <span className="text-2xl font-black text-slate-800 dark:text-white font-outfit">{isUserDataLoading ? "..." : activeUsers}</span>
                        </div>
                    </div>

                    {/* Blocked Widget */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-5 rounded-3xl shadow-sm flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                        <div className="p-3 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-2xl">
                            <ShieldAlert size={24} />
                        </div>
                        <div>
                            <span className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider block">Blocked Users</span>
                            <span className="text-2xl font-black text-slate-800 dark:text-white font-outfit">{isUserDataLoading ? "..." : blockedUsers}</span>
                        </div>
                    </div>
                </div>

                {/* User Cards Feed */}
                {isUserDataLoading ? (
                    /* Loading Skeleton */
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-5 rounded-3xl shadow-sm animate-pulse flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div className="flex items-center gap-4 w-2/3">
                                    <div className="w-14 h-14 bg-slate-200 dark:bg-slate-800 rounded-full flex-shrink-0"></div>
                                    <div className="space-y-2 flex-grow">
                                        <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                        <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                    </div>
                                </div>
                                <div className="h-9 w-28 bg-slate-200 dark:bg-slate-800 rounded-2xl self-start sm:self-center"></div>
                            </div>
                        ))}
                    </div>
                ) : filteredUsers?.length ? (
                    <div className="space-y-4">
                        {filteredUsers?.map((item) => {
                            const isUserActive = item?.userStatus === "active";
                            const defaultAvatar = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

                            return (
                                <div
                                    key={item?._id}
                                    className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-100 dark:border-slate-800/80 p-5 rounded-3xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-orange-500/20 dark:hover:border-orange-500/20 hover:-translate-y-0.5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                                >
                                    {/* Left: Avatar, Name, Email, Role (md:col-span-5) */}
                                    <div className="flex items-center gap-4 min-w-0 md:col-span-5">
                                        <div className="relative flex-shrink-0">
                                            <img
                                                className="size-14 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800 ring-offset-2 dark:ring-offset-slate-900 bg-slate-100 dark:bg-slate-800 transition-transform duration-350 hover:scale-105"
                                                src={item?.image || defaultAvatar}
                                                alt={item?.name}
                                                onError={(e) => {
                                                    e.target.src = defaultAvatar;
                                                }}
                                            />
                                            <span className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-white dark:border-slate-900 ${isUserActive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-2 tracking-wide font-outfit text-base">
                                                <span className="truncate">{item?.name}</span>
                                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider ${item?.role === "admin" ? "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400" : "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-450"}`}>
                                                    {item?.role}
                                                </span>
                                            </h3>
                                            <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-1 truncate">
                                                <Mail size={12} className="flex-shrink-0 text-slate-400 dark:text-slate-500" />
                                                <span className="truncate">{item?.email}</span>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Middle: Phone and Address (md:col-span-4) */}
                                    <div className="flex flex-col gap-1.5 md:col-span-4 pl-0 md:pl-4 border-l-0 md:border-l border-slate-100 dark:border-slate-800/80">
                                        <span className="text-xs text-slate-600 dark:text-slate-450 flex items-center gap-1.5 font-medium">
                                            <Phone size={13} className="text-slate-400 dark:text-slate-500" />
                                            <span>{item?.mobile || "No phone added"}</span>
                                        </span>
                                        <span className="text-xs text-slate-500 dark:text-slate-500 flex items-center gap-1.5 max-w-[240px] truncate" title={item?.address}>
                                            <MapPin size={13} className="text-slate-400 dark:text-slate-500 flex-shrink-0" />
                                            <span className="truncate">{item?.address || "No address added"}</span>
                                        </span>
                                    </div>

                                    {/* Right: Actions (md:col-span-3) */}
                                    <div className="flex justify-start md:justify-end gap-2 md:col-span-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800/40">
                                        {isUserActive ? (
                                            <button
                                                onClick={() => handleUserStatus("/admin/block-user", item?._id)}
                                                className="w-full md:w-28 py-2.5 bg-emerald-50 hover:bg-rose-50 dark:bg-emerald-950/20 dark:hover:bg-rose-950/30 text-emerald-700 hover:text-rose-700 dark:text-emerald-400 dark:hover:text-rose-450 border border-emerald-100 dark:border-emerald-900/30 hover:border-rose-100 dark:hover:border-rose-900/30 rounded-2xl text-xs font-bold transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                                            >
                                                <UserCheck size={13} />
                                                <span>Active</span>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleUserStatus("/admin/active-user", item?._id)}
                                                className="w-full md:w-28 py-2.5 bg-rose-50 hover:bg-emerald-50 dark:bg-rose-950/20 dark:hover:bg-emerald-950/30 text-rose-700 hover:text-emerald-700 dark:text-rose-400 dark:hover:text-emerald-400 border border-rose-100 dark:border-rose-900/30 hover:border-emerald-100 dark:border-rose-900/30 rounded-2xl text-xs font-bold transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                                            >
                                                <UserX size={13} />
                                                <span>Blocked</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* Search Empty State */
                    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl text-center shadow-sm">
                        <Users size={48} className="text-slate-350 dark:text-slate-700 mb-4" />
                        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 font-outfit">No Users Found</h3>
                        <p className="text-sm text-slate-400 dark:text-slate-500 mt-1 max-w-xs leading-relaxed px-4">
                            We couldn't find any user matching your search query "{searchQuery}".
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ViewUser;
