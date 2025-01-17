import React, { useEffect } from "react";
import axiosInstance from "../../config/axiosInstance";
import { CartCard } from "../../components/user/CardsUser";
import { useDispatch, useSelector } from "react-redux";
import { saveCartDetails } from "../../redux/features/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import getFetch from "../../hooks/getFetch";
import { CartSkelton } from "../../components/user/Skelton";

function Cart() {

    const [cartDetails, isCartLoading, cartErr] = getFetch('cart/get-cart-items')
    const dispatch = useDispatch()

    function updateCartDetails(newCartDetails) {
        dispatch(saveCartDetails(newCartDetails))
    }

    // function getCartDetails() {
    //     axiosInstance({
    //         method: "GET",
    //         url: "cart/get-cart-items",
    //     })
    //         .then((res) => {
    //             console.log("res :>> ", res);
    //             dispatch(saveCartDetails(res?.data?.data))
    //         })
    //         .catch((err) => {
    //             console.log("err :>> ", err);
    //         });
    // }

    async function makePayment() {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_key)

        axiosInstance({
            method: 'POST',
            url: 'payment/create-checkout-session',
            data: { products: cartDetails?.cartItems }
        })
            .then(async (res) => {
                console.log('res :>> ', res);
                const session = res
                const result = await stripe.redirectToCheckout({ sessionId: session?.data?.sessionId });
                if (result.error) {
                    toast.error(result.error.message);
                }

            })
            .catch((err) => {
                console.log('err :>> ', err);
                toast.error('Error occure in payment')
            })
    }

    return (
        <div>
            {
                isCartLoading ? (
                    <CartSkelton />

                ) : (
                    <div className="max-w-screen-lg mx-auto p-6">
                        {/* Title Section */}
                        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Food Cart</h1>

                        {/* Cart Items List */}
                        <div className="space-y-6">
                            {cartDetails?.cartItems?.map((item, index) => (
                                <CartCard
                                    name={item?.foodId?.name}
                                    image={item?.foodId?.image}
                                    price={item?.foodId?.price}
                                    quantity={item.quantity}
                                    foodId={item?.foodId?._id}
                                    updateCartDetails={updateCartDetails}
                                    key={index}
                                />
                            ))}
                        </div>

                        {/* Total Price Section */}
                        <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center">
                            <div className="text-center sm:text-left">
                                <span className="text-xl font-semibold text-gray-700">Total Price:</span>
                                <span className="text-lg font-medium text-gray-900 ml-2">${cartDetails?.totalPrice}</span>
                            </div>
                            <button onClick={makePayment} className="btn bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 mt-4 sm:mt-0 rounded-lg shadow-md transition-all">
                                Make Payment
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Cart;
