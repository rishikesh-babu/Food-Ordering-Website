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
import { saveHotelDetails } from "../../redux/features/hotelSlice";
import { clearUserData } from "../../redux/features/userSlice";

function Home() {
    // console.log('Home render')

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { wishlistData } = useSelector((state) => state.wishlist)
    const {hotelDetails} = useSelector((state) => state.hotel)
    const [hotelData, isHotelLoading, hotelErr] = getFetch("hotel/get-all-hotels", saveHotelDetails);
    const [wishlistDetails, isWishloading, wishlistErr] = getFetch('/wishlist/get-wishlist', savewishlistData)
    const [foodDetails, isFoodLoading, foodErr] = getFetch("hotel/get-all-food", );
    const [cartDetails, isCartLoading, cartErr] = getFetch('/cart/get-cart-items', saveCartDetails)
    
    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    // console.log('wishlistDetails :>> ', wishlistDetails);
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
                        console.log('Call error function')
                        clearUserData()
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
            <div className="py-6 px-2 rounded-lg shadow-lg">
                <div className="text-2xl font-bold mb-3">
                    Popular Restaurants
                </div>
                <div className="text-gray-500">
                    Select Your favourite restaurant special dish and make your day happy...
                </div>
                <hr />
                {
                    hotelDetails.length === 0 && isHotelLoading ? (
                        <PopularHotelSkelton />
                    ) : (
                        <div className="p-4 sm:my-2 flex whitespace-nowrap gap-5 overflow-y-hidden overflow-x-auto scroll-smooth">
                            {hotelDetails?.map((item, index) => (
                                <UserHotelCard
                                    key={item._id}
                                    name={item.name}
                                    address={item.address}
                                    image={item.image}
                                    hotelId={item._id}
                                />
                            ))}
                        </div>
                    )
                }
                <div className="text-2xl font-bold mb-3 mt-6">
                    Popular Food
                </div>
                <div className="text-gray-500">
                    Here are some popular food items add then to cart and purchase....
                </div>
                <hr className="my-3" />
                {
                    !foodDetails && isFoodLoading ? (
                        <PopularFoodSkelton />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {foodDetails?.map((item, index) => (
                                <UserFoodCard
                                    key={item._id}
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
