import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { saveCartDetails } from "../../redux/features/cartSlice";
import { clearUserData } from "../../redux/features/userSlice";
import toast from "react-hot-toast";
import getFetch from "../../hooks/getFetch";
import { savewishlistData } from "../../redux/features/wishlistSlice";
import DarkMode from "../shared/DarkMode";

function UserHeader() {

    const [cartData, isCartLoading, cartErr] = getFetch('cart/get-cart-items', saveCartDetails)
    const [wishlistDetails, isWishloading, wishlistErr] = getFetch('/wishlist/get-wishlist', savewishlistData)
    const { userData } = useSelector((state) => state.user)
    const { cartLength } = useSelector((state) => state.cart)
    const { cartDetails } = useSelector((state) => state.cart)
    const navigete = useNavigate();
    const dispatch = useDispatch()

    function logout() {
        toast.promise(
            axiosInstance({
                method: 'POST',
                url: 'user/logout'
            })
                .then((res) => {
                    toast.success(res?.data?.message)
                    dispatch(clearUserData())
                })
                .catch((err) => {
                    console.log('err :>> ', err);
                }),
            {
                loading: 'Logout....'
            }
        )
    }

    return (
        <div className="navbar bg-base-100 fixed top-0 left-0 w-full z-10 shadow-md">
            <div className="flex-1">
                <div className="btn btn-ghost text-3xl font-bold">
                    <Link to={'/'}>
                        Food Express
                    </Link>
                </div>
            </div>
            <DarkMode />
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <span className="badge badge-sm indicator-item">{cartLength ?? 0}</span>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
                    >
                        <div className="card-body">
                            <span className="text-lg font-bold">{cartLength} Items</span>
                            <span className="text-info">Subtotal: ₹{cartDetails?.totalPrice}</span>
                            <div className="card-actions">
                                <button
                                    onClick={() => navigete("/user/cart")}
                                    className="btn btn-primary btn-block"
                                >
                                    View cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img
                                src={userData?.image}
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <Link to={'/user/profile'}>
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link to={'/user/orders'}>
                                Orders
                            </Link>
                        </li>
                        <li>
                            <Link to={'/user/wishlist'}>
                                Wishlist
                            </Link>
                        </li>
                        <li>
                            <span onClick={logout}>Logout</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UserHeader;