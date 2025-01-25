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
import HomePageCarousel from "../../components/user/Carousel";

function Home() {
    console.log('Home render')

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { wishlistData } = useSelector((state) => state.wishlist)
    const [hotelDetails, isHotelLoading, hotelErr] = getFetch("hotel/get-all-hotels");
    const [wishlistDetails, isWishloading, wishlistErr] = getFetch('/wishlist/get-wishlist', savewishlistData)
    const [foodDetails, isFoodLoading, foodErr] = getFetch("hotel/get-all-food");
    const [cartDetails, isCartLoading, cartErr] = getFetch('/cart/get-cart-items', saveCartDetails)

    console.log('wishlistDetails :>> ', wishlistDetails);
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
                        "jwt expired"
                    ) {
                        navigate("/login");
                    }
                }),
            {
                loading: "Adding to cart.......",
            }
        );
    }

    return (
        <div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
                {/* <HomePageCarousel /> */}
                <div className="text-2xl font-bold text-gray-800 mb-3">
                    Popular Restaurants
                </div>
                <div className="text-gray-500">
                    Select Your favourite restaurant special dish and make your day happy...
                </div>
                <hr />
                {
                    isHotelLoading ? (
                        <PopularHotelSkelton />
                    ) : (
                        <div className="mt-5 flex gap-5 overflow-y-hidden overflow-x-auto scroll-container scroll-smooth">
                            {hotelDetails?.map((item, index) => (
                                <UserHotelCard
                                    key={index}
                                    name={item.name}
                                    address={item.address}
                                    image={item.image}
                                    hotelId={item._id}
                                />
                            ))}
                        </div>
                    )
                }
                <div className="text-2xl font-bold text-gray-800 mb-3 mt-6">
                    Popular Food
                </div>
                <div className="text-gray-500">
                    Here are some popular food items add then to cart and purchase....
                </div>
                <hr className="my-3" />
                {
                    isFoodLoading ? (
                        <PopularFoodSkelton />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {foodDetails?.map((item, index) => (
                                <UserFoodCard
                                    key={index}
                                    name={item.name}
                                    price={item.price}
                                    image={item.image}
                                    foodId={item._id}
                                    addToCart={addToCart}
                                />
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Home;
