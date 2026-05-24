import { useNavigate } from "react-router-dom"
import { HotelRemoveButton, FoodRemoveButton } from "./ButtonAdmin"
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useState } from "react"
import axiosInstance from "../../config/axiosInstance"
import toast from "react-hot-toast"
import { DeleteForeverRounded, Edit } from "@mui/icons-material"

function HotelCard({ name, image, hotelId, address, hotel, openUpdateHotelModal }) {
    return (
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-100 dark:border-slate-800/80 p-4 rounded-3xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-orange-500/20 dark:hover:border-orange-500/20 hover:-translate-y-0.5 flex justify-center items-center  ">
            <div className="flex items-center gap-4 w-full min-w-0 sm:col-span-2">
                <div className="relative h-16 w-16 flex-shrink-0 group">
                    <img
                        className="h-full w-full rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-slate-800 transition-transform duration-300 group-hover:scale-105"
                        src={image}
                        alt="hotel image"
                    />
                </div>
                <div className="min-w-0 flex-grow text-left">
                    <div className="text-lg font-black text-slate-800 dark:text-white font-outfit tracking-wide truncate">
                        {name}
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-1">
                        <span className="text-slate-400">📍</span>
                        <span className="truncate max-w-[280px]" title={address}>{address || "No address added"}</span>
                    </div>
                </div>
            </div>

            <div className=" flex gap-3">
                <button
                    onClick={() => openUpdateHotelModal(hotel)}
                    className="p-3 bg-blue-100 hover:bg-blue-100 dark:bg-blue-950/30 dark:hover:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 border border-blue-300 dark:border-blue-900/40 cursor-pointer"
                    title="Edit Hotel"
                >
                    <Edit fontSize="medium" />
                </button>
                <div
                    className="p-3 bg-rose-200 hover:bg-rose-300 dark:bg-rose-950/30 dark:hover:bg-rose-950/50 text-rose-650 dark:text-rose-450 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 border border-rose-300 dark:border-rose-900/40 cursor-pointer flex items-center justify-center"
                    title="Delete Hotel"
                >
                    <HotelRemoveButton hotelId={hotelId} />
                </div>
            </div>
        </div>
    )
}

function FoodCard({ name, image, price, foodId, food, openUpdateFoodModal }) {
    return (
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-100 dark:border-slate-800/80 p-4 rounded-3xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-orange-500/20 dark:hover:border-orange-500/20 hover:-translate-y-0.5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-grow w-full min-w-0">
                <div className="relative h-16 w-16 flex-shrink-0 group">
                    <img
                        className="h-full w-full rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-slate-800 transition-transform duration-300 group-hover:scale-105"
                        src={image}
                        alt={name}
                    />
                </div>
                <div className="min-w-0 flex-grow text-left">
                    <div className="text-lg font-black text-slate-800 dark:text-white font-outfit tracking-wide truncate">
                        {name}
                    </div>
                    <div className="text-sm font-black text-emerald-600 dark:text-emerald-405 mt-1 font-outfit">
                        ₹{price}
                    </div>
                </div>
            </div>

            <div className="flex-shrink-0 flex items-center gap-3 w-full sm:w-auto justify-end border-t sm:border-0 border-slate-50 dark:border-slate-800/40 pt-3 sm:pt-0">
                <button
                    onClick={() => openUpdateFoodModal(food)}
                    className="p-2.5 bg-blue-200 hover:bg-blue-200 dark:bg-blue-950/30 dark:hover:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 border border-blue-300 dark:border-blue-900/40 cursor-pointer flex items-center justify-center"
                    title="Edit Dish"
                >
                    <Edit fontSize="medium" />
                </button>
                <div
                    className="p-2.5 bg-rose-200 hover:bg-rose-300 dark:bg-rose-950/30 dark:hover:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 border border-rose-300 dark:border-rose-900/40 cursor-pointer flex items-center justify-center"
                    title="Delete Dish"
                >
                    <FoodRemoveButton foodId={foodId} />
                </div>
            </div>
        </div>
    );
}

function ViewOrderCard({ name, image, totalPrice, foodItems, address, orderStatus, orderId }) {
    const [status, setStatus] = useState(orderStatus);
    const [tempOrderStatus, setTemepOrderStatus] = useState(orderStatus)

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        setStatus(newStatus);
    };

    function handleStatus() {
        let url
        if (status === 'complete') {
            url = '/order/complete-order'
        } else if (status === 'cancel') {
            url = '/order/cancel-order'
        } else {
            toast.error('Select status', {
                duration: Infinity
            })
            setTimeout(() => {
                toast.dismiss()
            }, 1500);
            return
        }

        toast.promise(
            axiosInstance({
                method: 'PUT',
                url: url,
                data: { orderId },
            })
                .then((res) => {
                    console.log('res :>> ', res);
                    orderStatus = res?.data?.data?.orderStatus
                    setTemepOrderStatus(orderStatus)
                    console.log('orderStatus :>> ', orderStatus);
                    toast.success(res?.data?.message)
                })
                .catch((err) => {
                    console.log('err :>> ', err);
                    toast.error(err?.response?.data?.message || 'Error happen')
                }),
            {
                loading: 'Changing status'
            }
        )
    }

    return (
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-100 dark:border-slate-800/80 p-6 rounded-3xl shadow-sm transition-all duration-300 hover:shadow-md max-w-3xl mx-auto mb-6">
            <div className="flex flex-col gap-5">
                {/* User & Price Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-50 dark:border-slate-800/60">
                    <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 flex-shrink-0">
                            <img
                                className="h-full w-full rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
                                src={image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"}
                                alt={name}
                            />
                            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-green-500"></span>
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-slate-800 dark:text-white tracking-wide font-outfit">{name || "Anonymous"}</h2>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Customer Profile</p>
                        </div>
                    </div>
                    <div className="text-left sm:text-right">
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider font-outfit">Total Amount</p>
                        <p className="text-2xl font-black text-slate-800 dark:text-white font-outfit mt-0.5">₹{totalPrice}</p>
                    </div>
                </div>

                {/* Delivery Address */}
                <div className="flex items-start gap-2 text-slate-550 dark:text-slate-400 mt-1 text-sm bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/40">
                    <span className="text-base text-slate-400 mt-0.5">📍</span>
                    <p className="font-semibold leading-relaxed">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-wider font-outfit block mb-1">Delivery Address</span>
                        {address || "No address added"}
                    </p>
                </div>

                {/* Food Items Ordered */}
                <div>
                    <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider font-outfit mb-3">Order Items</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {foodItems?.map((item, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-950/40 border border-slate-100/50 dark:border-slate-800/30 rounded-2xl">
                                {item?.foodId?.image && (
                                    <img src={item.foodId.image} className="w-10 h-10 object-cover rounded-xl" alt={item?.foodId?.name} />
                                )}
                                <div className="min-w-0 flex-grow text-left">
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">{item?.foodId?.name || "Dish"}</p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 font-medium">
                                        {item.quantity} x ₹{item.price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Status and Action Dropdown */}
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-slate-50 dark:border-slate-800/60">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 font-outfit uppercase tracking-wider">Status:</span>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full font-outfit capitalize tracking-wide ${
                            tempOrderStatus === 'pending'
                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/30'
                                : tempOrderStatus === 'complete'
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/30'
                                : 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/30'
                        }`}>
                            ● {tempOrderStatus}
                        </span>
                    </div>

                    {tempOrderStatus !== 'complete' && tempOrderStatus !== 'cancel' && (
                        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                            <div className="relative min-w-[130px]">
                                <select
                                    value={status}
                                    onChange={handleStatusChange}
                                    className="w-full pl-3 pr-8 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none text-slate-700 dark:text-slate-200 transition-all font-semibold font-outfit cursor-pointer appearance-none"
                                >
                                    <option value="complete">Complete</option>
                                    <option value="cancel">Cancel</option>
                                </select>
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            <button
                                onClick={() => handleStatus()}
                                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-black tracking-wide transition-all duration-200 cursor-pointer active:scale-95 shadow-sm focus:outline-none"
                            >
                                Update Status
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export { HotelCard, FoodCard, ViewOrderCard }