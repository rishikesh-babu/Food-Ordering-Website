import React, { useEffect } from "react";
import axiosInstance from "../../config/axiosInstance";
import { CartCard } from "../../components/user/CardsUser";
import { useDispatch, useSelector } from "react-redux";
import { saveCartDetails } from "../../redux/features/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import getFetch from "../../hooks/getFetch";
import { CartSkelton } from "../../components/user/Skelton";
import { useNavigate } from "react-router-dom";
import { Edit } from "lucide-react";
import { EditAddressModal } from "../../components/user/Modal";

function Cart() {
    const [cartData, isCartLoading, cartErr] = getFetch(
        "cart/get-cart-items",
        saveCartDetails
    );
    const { cartDetails } = useSelector((state) => state.cart);
    const { userData } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(saveCartDetails(cartDetails));
    }, [cartDetails]);

    useEffect(() => {
        if (!isCartLoading) {
            window.scrollTo(0, 0)
        }
    }, [isCartLoading])

    function updateCartDetails(newCartDetails) {
        dispatch(saveCartDetails(newCartDetails));
    }

    function addToOrderList() {
        const foodItems = cartDetails?.cartItems?.map((item) => ({
            foodId: item?.foodId?._id,
            price: item?.price,
            quantity: item?.quantity
        }))
        axiosInstance({
            method: 'POST',
            url: '/order/add-order',
            data: {
                address: userData?.address,
                totalPrice: cartDetails?.totalPrice,
                foodItems: foodItems,
            }
        })
            .then((res) => {
                console.log('res :>> ', res);
            })
            .catch((err) => {
                console.log('err :>> ', err);
            })
    }

    async function makePayment() {
        addToOrderList()
        const stripe = await loadStripe(
            import.meta.env.VITE_STRIPE_Publishable_key
        );

        toast.promise(
            axiosInstance({
                method: "POST",
                url: "payment/create-checkout-session",
                data: { products: cartDetails?.cartItems },
            })
                .then(async (res) => {
                    console.log("res :>> ", res);
                    const session = res;
                    const result = await stripe.redirectToCheckout({
                        sessionId: session?.data?.sessionId,
                    });
                    if (result.error) {
                        toast.error(result.error.message);
                    }
                })
                .catch((err) => {
                    console.log("err :>> ", err);
                    toast.error("Error occure in payment");
                }),
            {
                loading: "Please wait",
            }
        );
    }

    function editAddress() {
        document.getElementById('editAddessModal').showModal()
    }

    return (
        <div>
            {isCartLoading ? (
                <CartSkelton />
            ) : (
                <div>
                    {!cartDetails ? (
                        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-red-50 dark:bg-gray-900">
                            <div className="flex flex-col items-center justify-center space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl max-w-lg w-full">
                                {/* Title */}
                                <div className="text-2xl md:text-3xl font-serif text-gray-800 dark:text-gray-100 text-center">
                                    Oops! Your cart is empty
                                </div>

                                {/* Subtitle */}
                                <p className="text-gray-500 dark:text-gray-300 text-pretty md:text-lg text-center px-4">
                                    It seems like you haven’t added anything to your cart yet.
                                    Explore our products and start adding your favorites!
                                </p>

                                {/* Button */}
                                <button
                                    onClick={() => navigate("/")}
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-6 md:px-8 py-2 md:py-3 rounded-full shadow-lg transition-transform duration-300 transform hover:scale-105"
                                >
                                    Buy Products
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-screen-lg mx-auto p-6">
                            {/* Title Section */}
                            <h1 className="text-3xl font-bold text-center mb-8">
                                Food Cart
                            </h1>

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
                                        key={item?.foodId?._id}
                                    />
                                ))}
                            </div>

                            <div className="p-6 mt-8 border-2 border-gray-300 rounded-md shadow-xl flex flex-col gap-4 sm:flex-row sm:justify-between bg-white dark:bg-gray-800">
                                {/* Address Section */}
                                <div>
                                    <div className="text-lg font-semibold ">Address</div>
                                    <div className="text-lg font-mono text-gray-600 dark:text-gray-500">{userData?.address}</div>
                                </div>

                                {/* Edit Button */}
                                <div className="self-center">
                                    <EditAddressModal />
                                    <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300 shadow-md" onClick={editAddress}>
                                        <Edit size={24} color="white" />
                                        <span className="text-lg font-semibold">Edit</span>
                                    </button>
                                </div>
                            </div>

                            {/* Total Price Section */}
                            <div className="p-6 mt-3 bg-gray-50 dark:bg-gray-800 border-2 rounded-lg shadow-xl flex flex-col sm:flex-row justify-between items-center">
                                <div className="text-center sm:text-left">
                                    <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                                        Total Price:
                                    </span>
                                    <span className="text-xl font-medium text-green-500 dark:text-green-400 ml-2">
                                        ₹{cartDetails?.totalPrice}
                                    </span>
                                </div>
                                <button
                                    onClick={makePayment}
                                    className="btn bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 mt-4 sm:mt-0 rounded-lg shadow-md transition-all"
                                >
                                    Make Payment
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Cart;
