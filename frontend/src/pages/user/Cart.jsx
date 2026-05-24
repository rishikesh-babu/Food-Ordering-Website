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
import { Edit, ShoppingCart } from "lucide-react";
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
            // window.scrollTo(0, 0)
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

    if (isCartLoading) {
        return <CartSkelton />;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 py-10 transition-colors duration-300">
            {!cartDetails || cartDetails?.cartItems?.length === 0 ? (
                /* Empty Cart State */
                <div className="flex flex-col items-center justify-center py-20 px-6">
                    <div className="flex flex-col items-center justify-center space-y-6 bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700/55 max-w-md w-full text-center">
                        <div className="w-20 h-20 bg-amber-50 dark:bg-amber-950/30 rounded-full flex items-center justify-center text-amber-500 shadow-inner">
                            <ShoppingCart size={40} />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-gray-800 dark:text-white font-outfit tracking-tight">
                            Your cart is empty
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed px-2">
                            Looks like you haven't added anything to your cart yet. Explore our delicious categories and start ordering!
                        </p>
                        <button
                            onClick={() => navigate("/")}
                            className="w-full bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all duration-200 text-sm uppercase tracking-wider"
                        >
                            Explore Restaurants
                        </button>
                    </div>
                </div>
            ) : (
                /* Filled Cart State */
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-8">
                        <ShoppingCart className="size-8 text-amber-500" />
                        <h1 className="text-3xl sm:text-4xl font-black text-gray-800 dark:text-white font-outfit tracking-tight">
                            Shopping Cart
                        </h1>
                        <span className="bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 text-xs font-bold px-2.5 py-1 rounded-full">
                            {cartDetails?.cartItems?.length || 0} items
                        </span>
                    </div>

                    {/* Main Content Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {/* Cart Items List Column */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="bg-white dark:bg-gray-800/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50 space-y-4 divide-y divide-gray-100 dark:divide-gray-700/50">
                                {cartDetails?.cartItems?.map((item) => (
                                    <div key={item?.foodId?._id} className="pt-4 first:pt-0">
                                        <CartCard
                                            name={item?.foodId?.name}
                                            image={item?.foodId?.image}
                                            price={item?.foodId?.price}
                                            quantity={item.quantity}
                                            foodId={item?.foodId?._id}
                                            updateCartDetails={updateCartDetails}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Summary & Checkout Column */}
                        <div className="space-y-6 lg:sticky lg:top-24">
                            {/* Address Card */}
                            <div className="bg-white dark:bg-gray-800/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 font-outfit">
                                        Delivery Address
                                    </h3>
                                    <button
                                        onClick={editAddress}
                                        className="flex items-center gap-1.5 text-xs font-bold text-amber-500 hover:text-amber-600 transition-colors"
                                    >
                                        <Edit size={14} />
                                        <span>Change</span>
                                    </button>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-100 dark:border-gray-800/30">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-relaxed break-words">
                                        {userData?.address || "No address added yet. Please update your address."}
                                    </p>
                                </div>
                                <EditAddressModal />
                            </div>

                            {/* Order Summary Card */}
                            <div className="bg-white dark:bg-gray-800/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50 space-y-4">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 font-outfit border-b border-gray-100 dark:border-gray-700 pb-3">
                                    Order Summary
                                </h3>
                                <div className="space-y-2.5 text-sm">
                                    <div className="flex justify-between text-gray-500 dark:text-gray-400">
                                        <span>Subtotal</span>
                                        <span className="font-semibold text-gray-750 dark:text-gray-200">₹{cartDetails?.totalPrice}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500 dark:text-gray-400">
                                        <span>Delivery Fee</span>
                                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">FREE</span>
                                    </div>
                                    <div className="border-t border-dashed border-gray-200 dark:border-gray-700 pt-3 flex justify-between text-base font-black text-gray-800 dark:text-white font-outfit">
                                        <span>Total</span>
                                        <span className="text-xl text-amber-500 dark:text-amber-400">₹{cartDetails?.totalPrice}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={makePayment}
                                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-extrabold rounded-2xl shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all duration-300 text-sm uppercase tracking-wider mt-4"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
