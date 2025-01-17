import React from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-lg">
                <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
                <p className="text-gray-600 mb-6">
                    Thank you for your order! Your payment has been processed successfully. 
                    You will receive a confirmation email shortly.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    {/* <button
                        onClick={() => navigate("/user/orders")}
                        className="btn bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transition-all"
                    >
                        View Orders
                    </button> */}
                    <button
                        onClick={() => navigate("/")}
                        className="btn bg-green-400 sm:bg-green-200 hover:bg-green-400 text-gray-700 px-6 py-3 rounded-lg shadow-md transition-all"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccess;
