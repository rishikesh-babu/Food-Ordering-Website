import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { saveCartDetails } from "../../redux/features/cartSlice";

function UserHeader() {
    
    const { cartDetails, cartLength } = useSelector((state) => state.cart)
    const navigete = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        getCartItems()
    }, [])

    function getCartItems() {
        axiosInstance({
            method: 'GET',
            url: 'cart/get-cart-items'
        })
            .then((res) => {
                console.log('res :>> ', res);
                dispatch(saveCartDetails(res?.data?.data))
            })
            .catch((err) => {
                console.log('err :>> ', err);
            })
    }
    
    console.log('cartDetails :>> ', cartDetails);

    return (
        <div className="navbar bg-base-100 fixed top-0 left-0 w-full z-10">
            <div className="flex-1">
                <a href="/" className="btn btn-ghost text-2xl font-bold">
                    {" "}
                    Food Express{" "}
                </a>
            </div>
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
                            <span className="badge badge-sm indicator-item">{cartLength}</span>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
                    >
                        <div className="card-body">
                            <span className="text-lg font-bold">{cartLength} Items</span>
                            <span className="text-info">Subtotal: ${cartDetails?.totalPrice}</span>
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
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <a className="justify-between">
                                Profile
                                {/* <span className="badge">New</span> */}
                            </a>
                        </li>
                        <li>
                            <a>Settings</a>
                        </li>
                        <li>
                            <a>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UserHeader;