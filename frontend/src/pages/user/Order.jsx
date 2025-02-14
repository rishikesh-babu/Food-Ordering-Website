import React, { useEffect } from "react";
import getFetch from "../../hooks/getFetch";
import { OrderListCard } from "../../components/user/CardsUser";
import { saveOrderDetails } from "../../redux/features/orderSlice";
import { useSelector } from "react-redux";
import { Home, HomeIcon, LucideHome, LucideHouse } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Order() {
    const navigate = useNavigate();
    const [orderData, isOrderLoading, orderError] = getFetch(
        "order/get-all-order",
        saveOrderDetails
    );
    const { orderDetails } = useSelector((state) => state.order);
    return (
        <div>
            <div className="text-3xl font-semibold text-center">Orders</div>
            {orderDetails?.length === 0 ? (
                <div className="sm:m-7">
                    {orderDetails?.orderList?.map((items, index) => (
                        <OrderListCard items={items} key={index} />
                    ))}
                </div>
            ) : (
                <div className="m-3 mb-7 border-2 border-gray-300 rounded-lg min-h-[50vh] sm:mx-24 flex flex-col gap-4 justify-center items-center shadow-xl">
                    <div className="text-center text-2xl font-semibold text-gray-600">
                        Nothing is ordered yet!!
                    </div>
                    <button
                        className="text-lg border-2 border-gray-400 flex justify-center items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 transition-all"
                        onClick={() => navigate("/")}
                    >
                        <Home size={20} /> Go to Home
                    </button>
                </div>
            )}
        </div>
    );
}

export default Order;
