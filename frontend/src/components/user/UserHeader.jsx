import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { saveCartDetails } from "../../redux/features/cartSlice";
import { clearUserData } from "../../redux/features/userSlice";
import toast from "react-hot-toast";
import getFetch from "../../hooks/getFetch";
import { savewishlistData } from "../../redux/features/wishlistSlice";
import DarkMode from "../shared/DarkMode";
import logo from '/logo.jpg';
import { ShoppingCart, Heart, User, ClipboardList, LogOut } from "lucide-react";

function UserHeader() {
    const [cartData, isCartLoading, cartErr] = getFetch(
        "cart/get-cart-items",
        saveCartDetails
    );
    const [wishlistDetails, isWishloading, wishlistErr] = getFetch(
        "/wishlist/get-wishlist",
        savewishlistData
    );
    const { userData } = useSelector((state) => state.user);
    const { cartLength } = useSelector((state) => state.cart);
    const { cartDetails } = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function logout() {
        toast.promise(
            axiosInstance({
                method: "POST",
                url: "user/logout",
            })
                .then((res) => {
                    toast.success(res?.data?.message);
                    dispatch(clearUserData());
                })
                .catch((err) => {
                    console.log("err :>> ", err);
                }),
            {
                loading: "Logging out...",
            }
        );
    }

    function goToCart(e) {
        navigate("/user/cart");
        e.currentTarget.blur();
    }

    return (
        <div className="navbar fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800/80 px-4 sm:px-8 transition-all duration-300">
            <div className="flex-1">
                <Link
                    to={"/"}
                    className="flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                    <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md ring-2 ring-amber-500/20">
                        <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-amber-500 to-rose-500 bg-clip-text text-transparent tracking-tight font-outfit">
                        Food Express
                    </span>
                </Link>
            </div>

            <div className="flex-none flex items-center gap-4">
                {/* Cart Dropdown */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <div className="indicator">
                            <ShoppingCart className="size-5 text-gray-700 dark:text-gray-300" />
                            <span className="badge badge-sm indicator-item bg-amber-500 border-none text-white font-extrabold px-1.5 py-0.5">
                                {cartLength ?? 0}
                            </span>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-white dark:bg-gray-800 z-50 mt-3 w-56 shadow-xl border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden"
                    >
                        <div className="card-body p-4">
                            <span className="text-base font-bold text-gray-800 dark:text-gray-100">{cartLength || 0} Items Selected</span>
                            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                                Subtotal: <span className="text-amber-500 font-extrabold text-base">₹{cartDetails?.totalPrice || '0'}</span>
                            </span>
                            <div className="card-actions mt-3">
                                <button
                                    onClick={goToCart}
                                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-all duration-200 shadow-md active:scale-95 text-sm border-none"
                                >
                                    View Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile / Menu Dropdown */}
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-amber-500/30 transition-all"
                    >
                        <div className="w-9 h-9 rounded-full ring-2 ring-gray-200 dark:ring-gray-700 overflow-hidden">
                            <img src={userData?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"} alt="Profile" className="object-cover w-full h-full" />
                        </div>
                    </div>
                    <ul
                        tabIndex={1}
                        className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-2xl z-50 mt-3 min-w-56 p-2 shadow-2xl border border-gray-100 dark:border-gray-750 gap-1"
                    >
                        <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700 mb-1">
                            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Signed in as</p>
                            <p className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">{userData?.name || "Guest User"}</p>
                        </div>
                        <li>
                            <Link
                                to={"/user/profile"}
                                onClick={(e) => e.currentTarget.blur()}
                                className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold"
                            >
                                <User className="size-4 text-gray-500 dark:text-gray-400" />
                                <span>Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/user/orders"}
                                onClick={(e) => e.currentTarget.blur()}
                                className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold"
                            >
                                <ClipboardList className="size-4 text-gray-500 dark:text-gray-400" />
                                <span>My Orders</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/user/wishlist"}
                                onClick={(e) => e.currentTarget.blur()}
                                className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold"
                            >
                                <Heart className="size-4 text-gray-500 dark:text-gray-400" />
                                <span>Wishlist</span>
                            </Link>
                        </li>
                        <li>
                            <button
                                onClick={logout}
                                className="flex items-center w-full gap-3 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 font-semibold text-left border-none"
                            >
                                <LogOut className="size-4" />
                                <span>Logout</span>
                            </button>
                        </li>
                        <li className="border-t border-gray-100 dark:border-gray-700 mt-1 pt-1 flex flex-row items-center justify-between px-3 py-1.5 hover:bg-transparent dark:hover:bg-transparent">
                            <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Theme</span>
                            <DarkMode />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default UserHeader;
