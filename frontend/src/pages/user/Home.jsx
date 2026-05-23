import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import { UserFoodCard, UserHotelCard } from "../../components/user/CardsUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveCartDetails } from "../../redux/features/cartSlice";
import getFetch from "../../hooks/getFetch";
import { PopularFoodSkelton, PopularHotelSkelton } from "../../components/user/Skelton";
import { savewishlistData } from "../../redux/features/wishlistSlice";
import { saveHotelDetails } from "../../redux/features/hotelSlice";
import { clearUserData } from "../../redux/features/userSlice";
import { Search, Truck, ShieldCheck, Clock, Utensils, Star } from "lucide-react";

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { hotelDetails } = useSelector((state) => state.hotel);
    const [hotelData, isHotelLoading, hotelErr] = getFetch("hotel/get-all-hotels", saveHotelDetails);
    const [wishlistDetails, isWishloading, wishlistErr] = getFetch('/wishlist/get-wishlist', savewishlistData);
    const [foodDetails, isFoodLoading, foodErr] = getFetch("hotel/get-all-food");
    const [cartDetails, isCartLoading, cartErr] = getFetch('/cart/get-cart-items', saveCartDetails);

    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

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
                    console.log("res :>> ", res);
                    dispatch(saveCartDetails(res?.data?.data));
                    toast.success(res?.data?.message);
                })
                .catch((err) => {
                    console.log("err :>> ", err);
                    toast.error(err?.response?.data?.message);
                    if (
                        err?.response?.data?.message === "Unauthorized user" ||
                        err?.response?.data?.message === "jwt expired"
                    ) {
                        clearUserData();
                        navigate("/login");
                    }
                }),
            {
                loading: "Adding to cart.......",
            }
        );
    }

    const categories = [
        { name: "All", icon: "🍽️" },
        { name: "Biryani", icon: "🍚", keyword: "biryani|rice" },
        { name: "Pizza", icon: "🍕", keyword: "pizza|cheese" },
        { name: "Burger", icon: "🍔", keyword: "burger|sandwich" },
        { name: "Desserts", icon: "🍰", keyword: "sweet|ice|cake|dessert|donut|shake" },
        { name: "Salads", icon: "🥗", keyword: "salad|veg|healthy" },
    ];

    // Filter hotels
    const filteredHotels = hotelDetails?.filter((item) => {
        return (
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.address.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    // Filter foods
    const filteredFoods = foodDetails?.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));

        if (activeCategory === "All") return matchesSearch;

        const cat = categories.find((c) => c.name === activeCategory);
        const regex = new RegExp(cat.keyword, "i");
        const matchesCategory =
            item.name.match(regex) ||
            (item.description && item.description.match(regex));

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="bg-gray-50s sdark:bg-gray-900 min-h-screen pb-12 transition-colors duration-300">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-rose-500 dark:from-amber-900/60 dark:to-rose-900/60 py-20 px-6 sm:px-12 text-center text-white">
                {/* Decorative background circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-rose-300/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

                <div className="relative z-[1] max-w-3xl mx-auto">
                    <span className="bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full inline-block mb-4 shadow-sm border border-white/20">
                        🚀 Super Fast Delivery to Your Doorstep
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight mb-4 drop-shadow-sm font-outfit">
                        Satisfy Your <span className="underline decoration-wavy decoration-white">Cravings</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-white/95 mb-8 max-w-xl mx-auto font-medium">
                        Order from the top restaurants and favorite local food joints in just a few clicks.
                    </p>

                    {/* Live Search Bar */}
                    <div className="flex flex-col sm:flex-row items-center bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-xl max-w-2xl mx-auto border border-white/10 gap-2">
                        <div className="relative w-full flex items-center">
                            <Search className="absolute left-4 text-gray-400 size-5" />
                            <input
                                type="text"
                                placeholder="Search for food, restaurants, or cuisines..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none text-base border-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Filters / Categories */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl sm:text-2xl font-black text-gray-800 dark:text-gray-100 flex items-center gap-2">
                        <Utensils className="text-amber-500 size-6" /> What's on your mind?
                    </h2>
                </div>
                <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none scroll-smooth">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setActiveCategory(cat.name)}
                            className={`flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-sm border whitespace-nowrap ${
                                activeCategory === cat.name
                                    ? "bg-amber-500 text-white border-amber-500 scale-105 shadow-md shadow-amber-500/20"
                                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-100 dark:border-gray-700 hover:border-amber-500/50"
                            }`}
                        >
                            <span className="text-lg">{cat.icon}</span>
                            <span>{cat.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Popular Restaurants Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-800 dark:text-gray-100">
                            Popular Restaurants
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Order special dishes from our featured culinary partners.
                        </p>
                    </div>
                </div>

                {hotelDetails.length === 0 && isHotelLoading ? (
                    <PopularHotelSkelton />
                ) : filteredHotels?.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No restaurants match your search.</p>
                    </div>
                ) : (
                    <div className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth scrollbar-none">
                        {filteredHotels?.map((item) => (
                            <UserHotelCard
                                key={item._id}
                                name={item.name}
                                address={item.address}
                                image={item.image}
                                hotelId={item._id}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Popular Foods Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-800 dark:text-gray-100">
                            {activeCategory === "All" ? "Popular Dishes" : `${activeCategory} Selections`}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Freshly prepared meals delivered directly to your doorstep.
                        </p>
                    </div>
                </div>

                {!foodDetails && isFoodLoading ? (
                    <PopularFoodSkelton />
                ) : filteredFoods?.length === 0 ? (
                    <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No food items found matching your filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {filteredFoods?.map((item) => (
                            <UserFoodCard
                                key={item._id}
                                name={item.name}
                                price={item.price}
                                image={item.image}
                                foodId={item._id}
                                addToCart={addToCart}
                                description={item.description}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
                <div className="text-center max-w-xl mx-auto mb-12">
                    <h2 className="text-3xl font-black text-gray-800 dark:text-gray-100">
                        Why Order from Food Express?
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        We deliver happiness alongside great taste with every delivery.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:shadow-md">
                        <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 mb-4 shadow-inner">
                            <Truck className="size-6" />
                        </div>
                        <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Super Fast Delivery</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            Warm food delivered directly to your doorstep in 30 minutes or less.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:shadow-md">
                        <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center text-rose-600 mb-4 shadow-inner">
                            <Star className="size-6" />
                        </div>
                        <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Quality Partners</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            Only the highest-rated sanitation-certified restaurants listed.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:shadow-md">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 mb-4 shadow-inner">
                            <ShieldCheck className="size-6" />
                        </div>
                        <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Secure Payments</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            Safe and encrypted online transaction gateways with instant refunds.
                        </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:shadow-md">
                        <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950/50 flex items-center justify-center text-sky-600 mb-4 shadow-inner">
                            <Clock className="size-6" />
                        </div>
                        <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Late Night Support</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            Help desk support available 24/7 to resolve any queries instantly.
                        </p>
                    </div>
                </div>
            </div>

            {/* App Banner Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 to-gray-850 dark:from-gray-950 dark:to-gray-900 p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>
                    <div className="max-w-lg relative z-[1]">
                        <span className="text-amber-500 font-extrabold text-xs tracking-wider uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/25">
                            Food Express Mobile App
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black mt-4 leading-tight">
                            Order food on the go. Get the app now!
                        </h2>
                        <p className="text-gray-400 text-sm sm:text-base mt-3 leading-relaxed">
                            Download the Food Express mobile application to access exclusive mobile coupons, real-time rider tracking, and custom daily notifications.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-8">
                            <button className="flex items-center gap-3 px-5 py-2.5 bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-bold transition-all shadow-md active:scale-95 text-sm">
                                🍏 App Store
                            </button>
                            <button className="flex items-center gap-3 px-5 py-2.5 bg-gray-800 text-white hover:bg-gray-700 rounded-xl font-bold transition-all shadow-md border border-gray-700 active:scale-95 text-sm">
                                🤖 Google Play
                            </button>
                        </div>
                    </div>
                    <div className="relative flex justify-center items-center w-full md:w-auto z-[1]">
                        {/* A nice mockup container represent app screen */}
                        <div className="w-56 h-96 bg-gray-950 rounded-[40px] border-[8px] border-gray-800 shadow-2xl overflow-hidden flex flex-col p-4 relative">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-gray-800 rounded-b-2xl z-[2]" />
                            {/* App Screen Content Preview */}
                            <div className="flex-1 bg-gray-900 rounded-[28px] overflow-hidden flex flex-col items-center pt-6 p-3">
                                <span className="text-[2em] mb-2">🍔</span>
                                <div className="w-full h-3 bg-gray-800 rounded-full mb-2"></div>
                                <div className="w-2/3 h-3 bg-gray-800 rounded-full mb-6"></div>
                                <div className="w-full flex-1 bg-gray-850/40 rounded-2xl p-2 flex flex-col gap-2">
                                    <div className="flex justify-between items-center bg-gray-800 p-1.5 rounded-lg">
                                        <div className="w-1/2 h-2 bg-gray-700 rounded-full"></div>
                                        <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                                    </div>
                                    <div className="flex justify-between items-center bg-gray-800 p-1.5 rounded-lg">
                                        <div className="w-2/3 h-2 bg-gray-700 rounded-full"></div>
                                        <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
