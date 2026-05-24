import { useDispatch, useSelector } from "react-redux";
import { DecreaseQuantityButton, IncreaseQuantityButton } from "./ButtonUser";
import { saveCartDetails } from "../../redux/features/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Trash2, MapPin, Calendar, CheckCircle2, Clock, XCircle, ShoppingBag } from "lucide-react";
import axiosInstance from "../../config/axiosInstance";
import { useEffect, useState } from "react";
import getFetch from "../../hooks/getFetch";
import { savewishlistData } from "../../redux/features/wishlistSlice";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { saveOrderDetails } from "../../redux/features/orderSlice";
import { Tooltip } from "@mui/material";
import { clearUserData } from "../../redux/features/userSlice";

function UserHotelCard({ name, image, address, hotelId }) {
    const navigate = useNavigate();

    // Deterministic rating & stats based on name length
    const rating = ((name.charCodeAt(0) % 5) * 0.2 + 4.1).toFixed(1);
    const deliveryTime = (name.charCodeAt(1) % 4) * 5 + 20;
    const distance = ((name.charCodeAt(2) % 3) * 0.8 + 1.2).toFixed(1);

    return (
        <div
            onClick={() => navigate(`/hotel/${hotelId}`)}
            className="group w-[280px] min-w-[280px] bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-amber-500/30 dark:hover:border-amber-500/30 flex flex-col shadow-sm"
        >
            <div className="relative h-44 w-full overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-gray-800 dark:text-gray-200 shadow-sm flex items-center gap-1">
                    <span className="text-amber-500">★</span> {rating}
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 truncate group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                    {name ?? "Restaurant"}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                    {address ?? "Address"}
                </p>
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-xs text-gray-400 dark:text-gray-500 font-medium">
                    <span>{deliveryTime} mins</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                    <span>{distance} km</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Free Delivery</span>
                </div>
            </div>
        </div>
    );
}

function UserFoodCard({ name, image, price, foodId, addToCart, description }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartDetails } = useSelector((state) => state.cart);
    const { wishlistData } = useSelector((state) => state.wishlist);
    const isInWishlist = wishlistData?.foodItems?.filter(
        (items) => items?.foodId?._id === foodId
    );
    const isInCart = cartDetails?.cartItems?.filter(
        (items) => items?.foodId?._id === foodId
    );

    function addToWishlist() {
        toast.promise(
            axiosInstance({
                method: "POST",
                url: "/wishlist/add-to-wishlist",
                data: { foodId },
            })
                .then((res) => {
                    console.log("res :>> ", res);
                    toast.success(res?.data?.message);
                    dispatch(savewishlistData(res?.data?.data));
                })
                .catch((err) => {
                    console.log("err :>> ", err);
                    toast.error(err?.response?.data?.message);
                    if (err?.response?.data?.message === "Unauthorized User" || "jwt expired") {
                        navigate("/login");
                    }
                }),
            {
                loading: "Saving to wishlist.....",
            }
        );
    }

    function removeFromWishlist() {
        toast.promise(
            axiosInstance({
                method: "POST",
                url: "/wishlist/remove-from-wishlist",
                data: { foodId },
            })
                .then((res) => {
                    console.log("res :>> ", res);
                    toast.success(res?.data?.message);
                    dispatch(savewishlistData(res?.data?.data));
                })
                .catch((err) => {
                    console.log("err :>> ", err);
                    toast.error(err?.response?.data?.message);
                    if (err?.response?.data?.message === "Unauthorized User" || "jwt expired") {
                        navigate("/login");
                    }
                }),
            {
                loading: "Removing from wishlist.....",
            }
        );
    }

    function updateCartDetails(newCartDetails) {
        dispatch(saveCartDetails(newCartDetails));
    }

    function handleIncrease() {
        toast.promise(
            axiosInstance({
                method: "POST",
                url: "/cart/add-to-cart",
                data: { foodId },
            })
                .then((res) => {
                    dispatch(saveCartDetails(res?.data?.data));
                    toast.success(res?.data?.message);
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                }),
            {
                loading: "Adding to cart....",
            }
        );
    }

    function handleDecrease() {
        toast.promise(
            axiosInstance({
                method: "DELETE",
                url: "/cart/remove-cart-item",
                data: { foodId },
            })
                .then((res) => {
                    dispatch(saveCartDetails(res?.data?.data));
                    toast.success(res?.data?.message);
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                }),
            {
                loading: "Removing from cart....",
            }
        );
    }

    const isNonVeg = name.toLowerCase().match(/(chicken|beef|meat|fish|egg|mutton|kode|pork|kabab)/);

    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 transition-all duration-300 flex justify-between gap-4 relative overflow-hidden group hover:shadow-xl hover:border-amber-500/20">
            {/* Left Section: Food Details */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    {/* Veg/Non-Veg & Rating Badge */}
                    <div className="flex items-center gap-2 mb-2">
                        <div className={`w-4.5 h-4.5 border-2 ${isNonVeg ? 'border-red-500' : 'border-emerald-500'} flex items-center justify-center rounded p-0.5`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${isNonVeg ? 'bg-red-500' : 'bg-emerald-500'}`} />
                        </div>
                        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-1.5 py-0.5 rounded">
                            ★ {((name.charCodeAt(0) % 5) * 0.1 + 4.2).toFixed(1)}
                        </span>
                    </div>

                    {/* Food Name */}
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                        {name ?? "Food Item"}
                    </h3>

                    {/* Description */}
                    {description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-extrabold text-gray-900 dark:text-white">
                        ₹{price ?? "0"}
                    </span>
                    <div>
                        {isInCart?.[0] ? (
                            <div className="flex items-center bg-amber-500 text-white rounded-xl shadow-md overflow-hidden font-bold select-none">
                                <button
                                    onClick={handleDecrease}
                                    className="px-3 py-1 hover:bg-amber-600 active:scale-95 transition-all text-base font-extrabold focus:outline-none"
                                >
                                    −
                                </button>
                                <span className="px-2 text-sm font-bold min-w-[20px] text-center">
                                    {isInCart?.[0]?.quantity}
                                </span>
                                <button
                                    onClick={handleIncrease}
                                    className="px-3 py-1 hover:bg-amber-600 active:scale-95 transition-all text-base font-extrabold focus:outline-none"
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <button
                                className="px-5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md transition-all duration-200 hover:scale-105 active:scale-95 text-xs uppercase tracking-wider"
                                onClick={() => addToCart(foodId)}
                            >
                                Add
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Section: Image & Wishlist Button */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0">
                <Link to={`/food/${foodId}`} className="w-full h-full block">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform duration-300 border border-gray-100 dark:border-gray-700"
                    />
                </Link>

                {/* Wishlist Button Overlay */}
                <button
                    onClick={isInWishlist?.[0] ? removeFromWishlist : addToWishlist}
                    className="absolute top-2 right-2 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm p-1.5 rounded-full shadow-sm hover:scale-110 active:scale-95 transition-all text-gray-600 dark:text-gray-300 z-[1]"
                >
                    <Heart
                        size={14}
                        fill={isInWishlist?.[0] ? "red" : "none"}
                        className={isInWishlist?.[0] ? "text-red-500" : "text-gray-500 dark:text-gray-400"}
                    />
                </button>
            </div>
        </div>
    );
}

function CartCard({ name, price, quantity, image, foodId, updateCartDetails }) {
    const isNonVeg = name.toLowerCase().match(/(chicken|beef|meat|fish|egg|mutton|kode|pork|kabab)/);

    return (
        <div className="py-4 flex justify-between items-center gap-4 flex-nowrap group">
            {/* Food Image */}
            <div className="h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 relative overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 shadow-md">
                <Link to={`/food/${foodId}`} className="w-full h-full block">
                    <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </Link>
            </div>

            {/* Food Details */}
            <div className="flex-grow flex flex-col sm:items-start">
                <div className="flex items-center gap-1.5 mb-1">
                    <div className={`w-3.5 h-3.5 border ${isNonVeg ? 'border-red-500' : 'border-emerald-500'} flex items-center justify-center rounded p-0.5`}>
                        <div className={`w-1 h-1 rounded-full ${isNonVeg ? 'bg-red-500' : 'bg-emerald-500'}`} />
                    </div>
                    <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {isNonVeg ? 'Non-Veg' : 'Veg'}
                    </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                    {name}
                </h3>
                <p className="text-lg font-extrabold text-amber-500 dark:text-amber-400 mt-1">
                    ₹{price}
                </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3 select-none">
                <DecreaseQuantityButton
                    foodId={foodId}
                    updateCartDetails={updateCartDetails}
                />
                <span className="text-lg font-extrabold text-gray-800 dark:text-gray-100 min-w-[20px] text-center">
                    {quantity}
                </span>
                <IncreaseQuantityButton
                    foodId={foodId}
                    updateCartDetails={updateCartDetails}
                />
            </div>
        </div>
    );
}

function OrderListCard({ items }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formattedDate = new Date(items?.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    const displayId = items?._id ? `#${items._id.substring(items._id.length - 8).toUpperCase()}` : "";

    // Status config
    let statusLabel = "Pending";
    let statusClass = "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-100 dark:border-amber-900/35";
    let StatusIcon = Clock;

    if (items?.orderStatus === "complete") {
        statusLabel = "Delivered";
        statusClass = "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/35";
        StatusIcon = CheckCircle2;
    } else if (items?.orderStatus === "cancel") {
        statusLabel = "Cancelled";
        statusClass = "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-100 dark:border-rose-900/35";
        StatusIcon = XCircle;
    }

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:shadow-md hover:border-orange-500/10 dark:hover:border-orange-500/10 w-full">
            {/* Card Header: ID, Date, Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-3">
                    <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-xl text-slate-500 dark:text-slate-400">
                        <ShoppingBag size={18} />
                    </div>
                    <div>
                        <h4 className="text-sm font-black text-slate-850 dark:text-white tracking-wide">
                            Order {displayId}
                        </h4>
                        <div className="flex items-center gap-1 text-[11px] text-slate-405 dark:text-slate-500 mt-0.5">
                            <Calendar size={12} />
                            <span>{formattedDate}</span>
                        </div>
                    </div>
                </div>

                <div className={`self-start sm:self-center px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${statusClass}`}>
                    <StatusIcon size={13} className="animate-pulse" />
                    <span>{statusLabel}</span>
                </div>
            </div>

            {/* Card Body: List of food items ordered */}
            <div className="space-y-4 mb-4">
                {items?.foodItems?.map((foodItem, index) => {
                    const food = foodItem?.foodId;
                    if (!food) return null;
                    const isNonVeg = food.name.toLowerCase().match(/(chicken|beef|meat|fish|egg|mutton|kode|pork|kabab)/);

                    return (
                        <div key={index} className="flex items-center gap-4">
                            {/* Food Thumbnail */}
                            <div className="h-14 w-14 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 flex-shrink-0 bg-slate-100 dark:bg-slate-850">
                                <img
                                    src={food.image}
                                    alt={food.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            {/* Food Text Info */}
                            <div className="flex-grow min-w-0">
                                <div className="flex items-center gap-1.5">
                                    <div className={`w-3 h-3 border ${isNonVeg ? 'border-red-500' : 'border-emerald-500'} flex items-center justify-center rounded-[3px] p-0.5`}>
                                        <div className={`w-1 h-1 rounded-full ${isNonVeg ? 'bg-red-500' : 'bg-emerald-500'}`} />
                                    </div>
                                    <span className="font-bold text-sm text-slate-800 dark:text-slate-200 truncate">
                                        {food.name}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                                    Qty: {foodItem.quantity} · Price: ₹{foodItem.price}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Card Footer: Delivery Address, Total Price, Actions */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-2 max-w-sm">
                    <MapPin size={16} className="text-slate-400 dark:text-slate-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block uppercase tracking-wider">Delivery Address</span>
                        <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed truncate max-w-[280px]" title={items?.address}>
                            {items?.address}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 border-t border-dashed border-slate-100 dark:border-slate-800 sm:border-t-0 pt-3 sm:pt-0">
                    <div>
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block uppercase tracking-wider text-left sm:text-right">Amount Paid</span>
                        <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                            ₹{items?.totalPrice}
                        </span>
                    </div>

                    <button
                        onClick={() => navigate("/")}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-all active:scale-95 cursor-pointer border-none"
                    >
                        Order Again
                    </button>
                </div>
            </div>
        </div>
    );
}

export { UserHotelCard, UserFoodCard, CartCard, OrderListCard };
