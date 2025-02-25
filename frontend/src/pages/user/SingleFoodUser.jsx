import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import { MoveLeft } from "lucide-react";
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
        <div>
            {!foodDetails ? (
                <SingleFoodSkelton />
            ) : (
                <div className="container mx-auto p-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="flex justify-center">
                            <img
                                src={foodDetails?.image}
                                alt="Food"
                                className="w-full max-w-lg rounded-lg shadow-lg object-cover"
                            />
                        </div>
                        <div className="space-y-6">
                            <h1 className="text-3xl font-bold">
                                {foodDetails?.name}
                            </h1>
                            <div className="flex justify-between items-center">
                                <p className="text-xl text-green-600 dark:text-green-400 font-semibold">
                                    ₹{foodDetails?.price}
                                </p>
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

                            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                                {foodDetails?.description}
                            </p>

                            <div className="my-3">
                                <button
                                    onClick={() => navigate(-1)}
                                    className="btn bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md transition-all duration-200"
                                >
                                    <MoveLeft /> Go Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SingleFoodUser;
