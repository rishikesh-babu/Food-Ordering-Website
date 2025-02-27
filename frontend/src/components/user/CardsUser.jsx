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

function UserHotelCard({ name, image, address, hotelId }) {
    const navigate = useNavigate();

    return (
        <div
            // py-6 sm:p-6 w-72 bg-gradient-to-r from-blue-100 to-gray-200 rounded-lg flex flex-col xl:flex-row items-center gap-6 transition-transform transform hover:scale-105 shadow-lg hover:shadow-2xl
            onClick={() => navigate(`/hotel/${hotelId}`)}
            className="py-6 min-w-64 sm:max-w-[350px] shadow-lg sm:p-6 bg-gradient-to-r from-sky-200 to-gray-200 dark:bg-none hover:shadow-2xl dark:shadow-md dark:shadow-white dark:hover:shadow-white border border-white rounded-lg flex flex-col items-center gap-6 transition-transform transform sm:hover:scale-105 cursor-pointer"
        >
            <div className="flex-shrink-0">
                <img
                    src={image}
                    alt="Image"
                    className="size-28 md:h-32 md:w-32 rounded-xl object-cover border-2 border-blue-500 shadow-md"
                />
            </div>
            <div className="text-center">
                <div className="text-lg sm:text-lg text-wrap font-bold text-blue-600 ">
                    {name ?? "Name"}
                </div>
                <div className="sm:text-lg text-balance font-medium text-gray-800 dark:text-gray-400 mt-2">
                    {address ?? "address"}
                </div>
            </div>
        </div>
    );
}

function UserFoodCard({ name, image, price, foodId, addToCart }) {
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

    console.log("wishlistData :>> ", wishlistData);
    console.log("isInWishlist :>> ", isInWishlist);

    useEffect(() => { }, [cartDetails]);

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
                    if (
                        err?.response?.data?.message === "Unauthorized User" ||
                        "jwt expired"
                    ) {
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
                }),
            {
                loading: "Removing from wishlist.....",
            }
        );
    }

    function updateCartDetails(newCartDetails) {
        dispatch(saveCartDetails(newCartDetails));
    }

    return (
        <div className="p-3 sm:p-6 bg-gradient-to-r from-blue-100 to-blue-50 dark:bg-none dark:shadow-md dark:border dark:shadow-white rounded-lg shadow-xl grid grid-cols-2 items-center gap-6">
            <div className="flex-shrink-0">
                <Link to={`/food/${foodId}`}>
                    <img
                        src={image}
                        alt="Image"
                        className="size-28 md:h-32 md:w-32 rounded-xl object-cover border-2 border-blue-500 shadow-md hover:cursor-pointer hover:scale-105"
                    />
                </Link>
            </div>
            <div className="text-left md:text-left ">
                <div className="text-lg sm:text-xl font-bold text-blue-600">
                    {name ?? "Name"}
                </div>
                <div className="flex flex-row items-center justify-between my-3">
                    <span className="text-lg font-medium text-green-500 dark:text-green-400">
                    ₹{price ?? "price"}
                    </span>
                    <div className="cursor-pointer hover:scale-110">
                        {isInWishlist?.[0] ? (
                            <div onClick={removeFromWishlist}>
                                <Heart fill="red" />
                            </div>
                        ) : (
                            <div onClick={addToWishlist}>
                                <Heart />
                            </div>
                        )}
                    </div>
                </div>
                <div className="text-lg font-semibold">
                    {isInCart?.[0] ? (
                        <div className="flex flex-row items-center gap-3">
                            <div className="flex items-center">
                                <DecreaseQuantityButton
                                    foodId={foodId}
                                    updateCartDetails={updateCartDetails}
                                />
                            </div>
                            <div className="text-lg font-medium">
                                {" "}
                                {isInCart?.[0]?.quantity}
                            </div>
                            <div className="flex items-center">
                                <IncreaseQuantityButton
                                    foodId={foodId}
                                    updateCartDetails={updateCartDetails}
                                />
                            </div>
                        </div>
                    ) : (
                        <button
                            className="btn bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105"
                            onClick={() => addToCart(foodId)}
                        >
                            Add
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

function CartCard({ name, price, quantity, image, foodId, updateCartDetails }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 mb-4 border border-gray-300 rounded-lg shadow-md bg-white dark:bg-gray-800 w-full max-w-4xl mx-auto">
            <div className="flex justify-center sm:justify-start">
                <img
                    src={image}
                    alt="image"
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
                />
            </div>

            <div className="flex flex-col justify-center items-center sm:ml-4">
                <h3 className="text-xl sm:text-2xl font-semibold">
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
