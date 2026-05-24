import React, { useEffect } from "react";
import getFetch from "../../hooks/getFetch";
import { OrderListCard } from "../../components/user/CardsUser";
import { saveOrderDetails } from "../../redux/features/orderSlice";
import { useSelector } from "react-redux";
import { Home, ReceiptText } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Order() {
    const navigate = useNavigate();
    const [orderData, isOrderLoading, orderError] = getFetch(
        "order/get-all-order",
        saveOrderDetails
    );
    const { orderDetails } = useSelector((state) => state.order);

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 transition-colors duration-300 relative overflow-hidden">
            {/* Ambient Background Decorative Blobs */}
            <div className="absolute top-1/4 left-10 w-72 h-72 sm:w-96 sm:h-96 bg-orange-400/5 dark:bg-orange-600/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-10 w-72 h-72 sm:w-96 sm:h-96 bg-rose-400/5 dark:bg-rose-600/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-4xl relative">
                {orderDetails?.length ? (
                    <div className="py-6">
                        {/* Header */}
                        <div className="text-center mb-10">
                            <h1 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white tracking-tight flex items-center justify-center gap-2 font-outfit">
                                <ReceiptText className="w-8 h-8 text-orange-500" />
                                <span>Order History</span>
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                                Keep track of your culinary journeys and active deliveries.
                            </p>
                        </div>

                        {/* List */}
                        <div className="flex flex-col gap-6">
                            {orderDetails?.map((items) => (
                                <OrderListCard items={items} key={items?._id} />
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 py-12">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-2xl animate-pulse"></div>
                            <div className="relative w-24 h-24 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-center">
                                <ReceiptText size={44} className="text-orange-500 animate-bounce" strokeWidth={1.5} />
                            </div>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight font-outfit">
                            No Orders Placed Yet
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 mb-8 max-w-sm text-sm sm:text-base leading-relaxed px-2">
                            It looks like you haven't ordered anything yet. Browse our menu and treat yourself to a delicious meal!
                        </p>
                        <button
                            onClick={() => navigate("/")}
                            className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 flex items-center gap-2 cursor-pointer border-none"
                        >
                            <Home size={18} />
                            <span>Go to Home Page</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Order;
