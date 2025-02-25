import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { clearCartDetails, saveCartDetails } from "../../redux/features/cartSlice";
import getFetch from "../../hooks/getFetch";
import { saveUserData } from "../../redux/features/userSlice";

function PaymentSuccess() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        clearCart()
    }, [])

    function clearCart() {
        axiosInstance({
            method: 'DELETE',
            url: '/cart/delete-cart'
        })
            .then((res) => {
                console.log('res :>> ', res);
                dispatch(clearCartDetails())
            })
            .catch((err) => {
                console.log('err :>> ', err);
            })
    }

    return (
        <div className="min-h-screen bg-green-50 dark:bg-gray-900 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 text-center max-w-lg">
                <CheckCircle className="text-green-400 animate-bounce w-16 h-16 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-300 mb-4">Payment Successful!</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Thank you for your order! Your payment has been processed successfully. 
                    You will receive a confirmation email shortly.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={() => navigate("/")}
                        className="btn bg-green-400 sm:bg-green-300 hover:bg-green-400 text-gray-700 px-6 py-3 rounded-lg shadow-md transition-all"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccess;
