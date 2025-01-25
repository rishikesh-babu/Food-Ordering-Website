import React from "react";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PaymentCancel() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-lg">
                <XCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />
                <h1 className="text-3xl font-bold font-serif text-gray-800 mb-4">Payment Cancelled</h1>
                <p className="text-gray-600 mb-6">
                    Unfortunately, your payment was not completed. If this was unintentional,
                    you can try again or contact our support team for assistance.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={() => navigate('/user/cart')}
                        className="btn bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transition-all"
                    >
                        Retry Payment
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="btn bg-gray-200 sm:bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg shadow-md transition-all"
                    >
                        Go to Homepage
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentCancel;
