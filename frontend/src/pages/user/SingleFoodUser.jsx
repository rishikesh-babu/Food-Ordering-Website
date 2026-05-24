import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import { MoveLeft, Star, Clock, Flame, Utensils, ShoppingBag, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { saveCartDetails } from "../../redux/features/cartSlice";
import {
    DecreaseQuantityButton,
    IncreaseQuantityButton,
} from "../../components/user/ButtonUser";
import { SingleFoodSkelton } from "../../components/user/Skelton";

function SingleFoodUser() {
    const [foodDetails, setFoodDetails] = useState();
    const { cartDetails } = useSelector((state) => state.cart);
    const { foodId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isInCart = cartDetails?.cartItems?.filter((items) => {
        console.log("items?.foodId?._id :>> ", items?.foodId?._id);
        console.log("foodId :>> ", foodId);
        if (items?.foodId?._id === foodId) {
            return foodId;
        }
    });

    useEffect(() => {
        getFoodDetails();
        window.scroll(0, 0)
    }, []);

    function updateCartDetails(newCartDetails) {
        dispatch(saveCartDetails(newCartDetails));
    }

    function getFoodDetails() {
        axiosInstance({
            method: "GET",
            url: `/hotel/single-food/${foodId}`,
        })
            .then((res) => {
                console.log("res :>> ", res);
                setFoodDetails(res?.data?.data);
            })
            .catch((err) => {
                console.log("err :>> ", err);
            });
    }

    function addToCart() {
        toast.promise(
            axiosInstance({
                method: "POST",
                url: "/cart/add-to-cart",
                data: { foodId },
            })
                .then((res) => {
                    console.log("res :>> ", res);
                    dispatch(saveCartDetails(res?.data?.data));
                    toast.success(res?.data?.message);
                })
                .catch((err) => {
                    console.log("err :>> ", err);
                    toast.error(err?.response?.data?.message);
                    if (err?.response?.data?.message === "Unauthorized User" || 'jwt expeired') {
                        navigate("/login");
                    }
                }),
            {
                loading: "Adding to cart.......",
            }
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-slate-950 py-10 transition-colors duration-300">
            {/* Ambient Background Decorative Blobs */}
            <div className="absolute top-1/4 left-10 w-72 h-72 sm:w-96 sm:h-96 bg-orange-400/20 dark:bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-10 w-72 h-72 sm:w-96 sm:h-96 bg-amber-400/20 dark:bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>
            
            {!foodDetails ? (
                <SingleFoodSkelton />
            ) : (
                <div className="container mx-auto px-4 max-w-6xl relative ">
                    {/* Back Button Link */}
                    <div className="mb-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="group flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 font-medium transition-all duration-200 cursor-pointer bg-transparent border-none"
                        >
                            <MoveLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
                            <span>Go Back</span>
                        </button>
                    </div>

                    {/* Main Card */}
                    <div className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-md rounded-3xl border border-slate-200/50 dark:border-slate-800/80 shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                            {/* Left Column: Image Area */}
                            <div className="lg:col-span-6 flex flex-col justify-start">
                                <div className="relative group overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-video lg:aspect-[4/3] shadow-lg border border-slate-100 dark:border-slate-800/60 bg-slate-100 dark:bg-slate-800">
                                    <img
                                        src={foodDetails?.image}
                                        alt={foodDetails?.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Chef's Special Badge */}
                                    <span className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs tracking-wider uppercase px-3.5 py-1.5 rounded-full shadow-lg">
                                        ★ Chef's Special
                                    </span>
                                </div>
                            </div>

                            {/* Right Column: Content Area */}
                            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                                <div className="space-y-3">
                                    {/* Category tag */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-orange-500 dark:text-orange-400 uppercase tracking-widest bg-orange-500/10 dark:bg-orange-500/20 px-2.5 py-1 rounded-md">
                                            Delicious Dish
                                        </span>
                                    </div>
                                    
                                    {/* Food Name */}
                                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight leading-tight">
                                        {foodDetails?.name}
                                    </h1>
                                    
                                    {/* Rating row */}
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="flex text-amber-400">
                                            <Star className="w-4 h-4 fill-current" />
                                            <Star className="w-4 h-4 fill-current" />
                                            <Star className="w-4 h-4 fill-current" />
                                            <Star className="w-4 h-4 fill-current" />
                                            <Star className="w-4 h-4 fill-current text-slate-300 dark:text-slate-700" />
                                        </div>
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">4.0</span>
                                        <span className="text-slate-400 dark:text-slate-500">(120+ Reviews)</span>
                                    </div>
                                </div>

                                {/* Food Metadata Badges */}
                                <div className="grid grid-cols-3 gap-3 py-4 border-y border-slate-100 dark:border-slate-800/80">
                                    <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50">
                                        <Clock className="w-5 h-5 text-orange-500 mb-1" />
                                        <span className="text-xs text-slate-400 dark:text-slate-400 mb-0.5">Time</span>
                                        <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">15-20 min</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50">
                                        <Flame className="w-5 h-5 text-amber-500 mb-1" />
                                        <span className="text-xs text-slate-400 dark:text-slate-400 mb-0.5">Calories</span>
                                        <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">~340 kcal</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/50">
                                        <Utensils className="w-5 h-5 text-rose-500 mb-1" />
                                        <span className="text-xs text-slate-400 dark:text-slate-400 mb-0.5">Portion</span>
                                        <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200">Serves 1-2</span>
                                    </div>
                                </div>

                                {/* Price and Add-to-cart layout */}
                                <div className="bg-slate-50 dark:bg-slate-800/20 rounded-2xl p-4 sm:p-5 border border-slate-100 dark:border-slate-800/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-wider block mb-1">Price</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                                                ₹{foodDetails?.price}
                                            </span>
                                            <span className="text-sm text-slate-400 dark:text-slate-500 line-through font-medium">
                                                ₹{Math.round(foodDetails?.price * 1.25)}
                                            </span>
                                            <span className="bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-2 py-0.5 rounded">
                                                20% OFF
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action button */}
                                    <div className="w-full sm:w-auto">
                                        {isInCart?.[0] ? (
                                            <div className="flex items-center justify-between sm:justify-start gap-4 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 px-4 py-2 rounded-xl shadow-inner w-full sm:w-auto">
                                                <DecreaseQuantityButton
                                                    foodId={foodId}
                                                    updateCartDetails={updateCartDetails}
                                                />
                                                <span className="text-lg font-bold text-slate-800 dark:text-white min-w-[20px] text-center">
                                                    {isInCart?.[0]?.quantity}
                                                </span>
                                                <IncreaseQuantityButton
                                                    foodId={foodId}
                                                    updateCartDetails={updateCartDetails}
                                                />
                                            </div>
                                        ) : (
                                            <button
                                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer border-none"
                                                onClick={() => addToCart(foodId)}
                                            >
                                                <ShoppingBag className="w-5 h-5" />
                                                <span>Add to Cart</span>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* About Section */}
                                <div className="space-y-2">
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider">About this dish</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                        {foodDetails?.description || "No description available for this delicious item."}
                                    </p>
                                </div>

                                {/* Quality Checks */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                        <span>100% Quality Ingredients</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                        <span>Hygienic & Safe Preparation</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SingleFoodUser;
