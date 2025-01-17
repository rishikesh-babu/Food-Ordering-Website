import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import { UserFoodCard, UserHotelCard } from "../../components/user/CardsUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveCartDetails } from "../../redux/features/cartSlice";
import getFetch from "../../hooks/getFetch";
import { HomeSkelton } from "../../components/user/Skelton";

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [hotelDetails, isHotelLoading, hotelErr] = getFetch(
        "hotel/get-all-hotels"
    );
    const [foodDetails, isFoodLoading, foodErr] = getFetch("hotel/get-all-food");

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
            {isFoodLoading || isHotelLoading ? (
                <HomeSkelton />
            ) : (
                <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
                    <div className="text-2xl font-bold text-gray-800 mb-6">
                        Popular Restaurants
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                    <div className="text-2xl font-bold text-gray-800 mb-6">
                        Popular Food
                    </div>
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
                </div>
            )}
        </div>
    );
}

export default Home;
