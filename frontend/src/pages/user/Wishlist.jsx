import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getFetch from "../../hooks/getFetch";
import { savewishlistData } from "../../redux/features/wishlistSlice";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { saveCartDetails } from "../../redux/features/cartSlice";
import { WishlistSkelton } from "../../components/user/Skelton";
import { Heart, ShoppingBag, Star, Plus, Minus, Sparkles } from "lucide-react";

function Wishlist() {
    const [wishlistDetails, wishlistLoading, wishlistErr] = getFetch('/wishlist/get-wishlist', savewishlistData);
    const { wishlistData } = useSelector((state) => state.wishlist);
    const { cartDetails } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    function addToCart(foodId) {
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
                    if (
                        err?.response?.data?.message === "Unauthorized User" ||
                        err?.response?.data?.message === "Unauthorized user" ||
                        err?.response?.data?.message === "jwt expired"
                    ) {
                        navigate("/login");
                    }
                }),
            {
                loading: "Adding to cart.......",
            }
        );
    }

    function removeFromWishlist(foodId) {
        toast.promise(
            axiosInstance({
                method: "POST",
                url: "/wishlist/remove-from-wishlist",
                data: { foodId },
            })
                .then((res) => {
                    dispatch(savewishlistData(res?.data?.data));
                    toast.success(res?.data?.message);
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message || "Failed to remove from wishlist");
                    if (
                        err?.response?.data?.message === "Unauthorized User" ||
                        err?.response?.data?.message === "Unauthorized user" ||
                        err?.response?.data?.message === "jwt expired"
                    ) {
                        navigate("/login");
                    }
                }),
            {
                loading: "Removing from wishlist.....",
            }
        );
    }

    function handleIncrease(foodId) {
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

    function handleDecrease(foodId) {
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

    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-slate-950 py-10 transition-colors duration-300">
            {/* Ambient Background Decorative Blobs */}
            <div className="absolute top-1/4 left-10 w-72 h-72 sm:w-96 sm:h-96 bg-rose-400/10 dark:bg-rose-600/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-10 w-72 h-72 sm:w-96 sm:h-96 bg-orange-400/10 dark:bg-orange-600/5 rounded-full blur-3xl pointer-events-none"></div>

            {wishlistLoading ? (
                <WishlistSkelton />
            ) : (
                <div className="container mx-auto px-4 max-w-6xl relative">
                    {wishlistData?.foodItems?.length === 0 ? (
                        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 py-12">
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-2xl animate-pulse"></div>
                                <div className="relative w-24 h-24 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-center">
                                    <Heart size={44} className="text-rose-500 animate-bounce" fill="none" strokeWidth={1.5} />
                                </div>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                                Your Wishlist is Empty
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-2 mb-8 max-w-sm text-sm sm:text-base leading-relaxed">
                                Tap the heart icon on any food item to save your favorites here and order them anytime!
                            </p>
                            <Link
                                to="/"
                                className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center gap-2 cursor-pointer"
                            >
                                <Sparkles size={18} />
                                <span>Browse Delicious Food</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="py-6">
                            <div className="text-center mb-10">
                                <h1 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white tracking-tight flex items-center justify-center gap-2">
                                    <Heart className="w-8 h-8 text-rose-500" fill="currentColor" />
                                    <span>My Favourite Foods</span>
                                </h1>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                                    A curated list of your favorite dishes, ready to order.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                {wishlistData?.foodItems?.map((item) => {
                                    const food = item.foodId;
                                    if (!food) return null;
                                    const foodId = food._id;
                                    const isInCart = cartDetails?.cartItems?.filter(
                                        (cartItem) => cartItem?.foodId?._id === foodId
                                    );
                                    const isNonVeg = food.name.toLowerCase().match(/(chicken|beef|meat|fish|egg|mutton|kode|pork|kabab)/);

                                    return (
                                        <div
                                            key={foodId}
                                            className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-md overflow-hidden hover:shadow-xl hover:border-orange-500/20 dark:hover:border-orange-500/20 transition-all duration-300 flex flex-col justify-between h-[380px]"
                                        >
                                            {/* Image section with overlay */}
                                            <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                                <Link to={`/food/${foodId}`} className="w-full h-full block">
                                                    <img
                                                        src={food.image}
                                                        alt={food.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </Link>
                                                {/* Rating Badge */}
                                                <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm flex items-center gap-1">
                                                    <span className="text-amber-500">★</span>
                                                    <span>{((food.name.charCodeAt(0) % 5) * 0.1 + 4.2).toFixed(1)}</span>
                                                </div>
                                                {/* Veg/Non-Veg Indicator */}
                                                <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-1.5 rounded-lg flex items-center justify-center">
                                                    <div className={`w-3.5 h-3.5 border ${isNonVeg ? 'border-red-500' : 'border-emerald-500'} flex items-center justify-center rounded p-0.5`}>
                                                        <div className={`w-1 h-1 rounded-full ${isNonVeg ? 'bg-red-500' : 'bg-emerald-500'}`} />
                                                    </div>
                                                </div>
                                                {/* Remove button */}
                                                <button
                                                    onClick={() => removeFromWishlist(foodId)}
                                                    className="absolute top-3 right-3 bg-white/90 dark:bg-slate-950/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:scale-110 active:scale-95 transition-all text-red-500 hover:text-red-600 hover:shadow-red-500/10 cursor-pointer border-none"
                                                    title="Remove from Wishlist"
                                                >
                                                    <Heart size={16} fill="red" className="text-red-500" />
                                                </button>
                                            </div>

                                            {/* Content section */}
                                            <div className="p-4 flex flex-col flex-grow justify-between">
                                                <div className="space-y-1">
                                                    <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white truncate group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                                                        {food.name}
                                                    </h3>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                                        {food.description || "No description available for this delicious item."}
                                                    </p>
                                                </div>

                                                {/* Price and Cart Actions */}
                                                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                                                    <div>
                                                        <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 block">Price</span>
                                                        <div className="flex items-baseline gap-1.5">
                                                            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                                                                ₹{food.price}
                                                            </span>
                                                            <span className="text-xs text-slate-400 dark:text-slate-500 line-through">
                                                                ₹{Math.round(food.price * 1.25)}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        {isInCart?.[0] ? (
                                                            <div className="flex items-center bg-orange-500 text-white rounded-xl shadow-md overflow-hidden font-bold select-none">
                                                                <button
                                                                    onClick={() => handleDecrease(foodId)}
                                                                    className="px-3 py-1.5 hover:bg-orange-600 active:scale-95 transition-all text-sm font-extrabold cursor-pointer border-none"
                                                                >
                                                                    −
                                                                </button>
                                                                <span className="px-1.5 text-xs font-bold min-w-[16px] text-center">
                                                                    {isInCart?.[0]?.quantity}
                                                                </span>
                                                                <button
                                                                    onClick={() => handleIncrease(foodId)}
                                                                    className="px-3 py-1.5 hover:bg-orange-600 active:scale-95 transition-all text-sm font-extrabold cursor-pointer border-none"
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl shadow-md transition-all duration-200 hover:scale-105 active:scale-95 text-xs flex items-center gap-1.5 cursor-pointer border-none"
                                                                onClick={() => addToCart(foodId)}
                                                            >
                                                                <ShoppingBag size={14} />
                                                                <span>Add to Cart</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Wishlist;
