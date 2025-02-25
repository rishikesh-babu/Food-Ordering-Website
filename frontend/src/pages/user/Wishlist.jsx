import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserFoodCard } from "../../components/user/CardsUser";
import getFetch from "../../hooks/getFetch";
import { savewishlistData } from "../../redux/features/wishlistSlice";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { saveCartDetails } from "../../redux/features/cartSlice";
import { WishlistSkelton } from "../../components/user/Skelton";

function Wishlist() {

    const [wishlistDetails, wishlistLoading, wishlistErr] = getFetch('/wishlist/get-wishlist', savewishlistData)
    const { wishlistData } = useSelector((state) => state.wishlist);
    const dispatch = useDispatch()
    const navigete = useNavigate()

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    // console.log('wishlistLoading :>> ', wishlistLoading);

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
                        navigete("/login");
                    }
                }),
            {
                loading: "Adding to cart.......",
            }
        );
    }

    return (
        <div>
            {
                wishlistLoading ? (
                    <WishlistSkelton />
                ) : (
                    <div className="max-w-screen-lg mx-auto p-6">
                        <h1 className="text-3xl font-bold text-center mb-8">
                            Wishlist
                        </h1>
                        <div className="space-y-6 max-w-2xl mx-auto">
                            {wishlistData?.foodItems?.map((item, index) => (
                                <UserFoodCard
                                    key={index}
                                    name={item.foodId.name}
                                    price={item.foodId.price}
                                    image={item.foodId.image}
                                    foodId={item.foodId._id}
                                    addToCart={addToCart}
                                />
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Wishlist;
