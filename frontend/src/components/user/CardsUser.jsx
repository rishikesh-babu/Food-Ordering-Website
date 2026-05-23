import { useDispatch, useSelector } from "react-redux";
import { DecreaseQuantityButton, IncreaseQuantityButton } from "./ButtonUser";
import { saveCartDetails } from "../../redux/features/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
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
    return (
        <div className="py-2 flex justify-between items-center gap-2 border-b-2 border-gray-400 flex-nowrap">
            <div className="h-20 w-20 flex-shrink-0">
                <Link to={`/food/${foodId}`} >
                    <img
                        src={image}
                        alt="image"
                        className="h-full w-full rounded-xl object-cover border-2 border-blue-600"
                    />
                </Link>
            </div>
            <div className="flex-grow flex flex-col sm:items-start sm:ml-4">
                <h3 className="text-lg sm:text-left md:text-xl font-semibold font-mono text-left flex-grow ">
                    {name}
                </h3>
                <p className="text-xl sm:text-2xl font-medium text-green-500 dark:text-green-400">
                    ₹{price}
                </p>
            </div>

            <div className="flex flex-row justify-center items-center gap-3">
                <div className="flex items-center">
                    <DecreaseQuantityButton
                        foodId={foodId}
                        updateCartDetails={updateCartDetails}
                    />
                </div>
                <div className="text-lg font-medium"> {quantity}</div>
                <div className="flex items-center">
                    <IncreaseQuantityButton
                        foodId={foodId}
                        updateCartDetails={updateCartDetails}
                    />
                </div>
            </div>
        </div>
    );
}

function OrderListCard({ items }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function deleteOrder() {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to undo this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                toast.promise(
                    axiosInstance({
                        method: "DELETE",
                        url: `order/delete-order/${items?._id}`,
                    })
                        .then((res) => {
                            dispatch(saveOrderDetails(res?.data?.data));
                            console.log("Order deleted!"); // Replace with delete logic
                            Swal.fire("Deleted!", "Your item has been removed.", "success");
                        })
                        .catch((err) => {
                            toast.error("Something went wrong!");
                        }),
                    {
                        loading: "Deleting order",
                    }
                );
            }
        });
    }

    return (
        <div
            className="m-1 mt-2 p-2 border rounded-md shadow-md"
        // onClick={() => navigate(`/user/order/${items?._id}`)}
        >
            <div className="grid grid-cols-[80px_1fr]">
                <span className="mr-2 text-lg font-semibold">Address:</span>
                <span className="text-lg">{items?.address}</span>
            </div>
            <div className="grid grid-cols-[80px_1fr]">
                <span className="mr-2 text-lg font-semibold">Date:</span>
                <span className="text-lg">
                    {items?.createdAt.slice(0, 10).split("-").reverse().join("-")}
                </span>
            </div>
            <div className="grid grid-cols-[80px_1fr]">
                <span className="mr-2 text-lg font-semibold">Total:</span>
                <span className="text-lg">₹{items?.totalPrice}</span>
            </div>
            <Tooltip title={`${items?.orderStatus === 'pending' ? 'Contact admin to clear order' : items?.orderStatus === 'complete' ? 'Order delivered successfully' : 'Order cancelled'}`} className={`grid grid-cols-[80px_1fr] cursor-pointer ${items?.orderStatus === 'pending' && 'text-yellow-500 dark:text-yellow-300'} ${items?.orderStatus === 'complete' && 'text-green-500 dark:text-green-400'} ${items?.orderStatus === 'cancel' && 'text-red-500'}`}>
                <span className="mr-2 text-lg font-semibold">Status:</span>
                <span className="text-lg font-semibold">{items?.orderStatus}</span>
            </Tooltip>
            {/* <button className="mt-2 hover:scale-105" onClick={deleteOrder}>
                <Trash2 />
            </button> */}
        </div>
    );
}

export { UserHotelCard, UserFoodCard, CartCard, OrderListCard };
