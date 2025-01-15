import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosInstance';
import { MoveLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { saveCartDetails } from '../../redux/features/cartSlice';

function SingleFoodUser() {
    const [foodDetails, setFoodDetails] = useState({});
    const { foodId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        getFoodDetails();
    }, []);

    function getFoodDetails() {
        axiosInstance({
            method: 'GET',
            url: `/hotel/single-food/${foodId}`
        })
            .then((res) => {
                console.log('res :>> ', res);
                setFoodDetails(res?.data?.data);
            })
            .catch((err) => {
                console.log('err :>> ', err);
            });
    }

    function addToCart() {
        toast.promise(
            axiosInstance({
                method: 'POST',
                url: '/cart/add-to-cart',
                data: { foodId },
            })
                .then((res) => {
                    console.log('res :>> ', res);
                    dispatch(saveCartDetails(res?.data?.data))
                    toast.success(res?.data?.message)
                })
                .catch((err) => {
                    console.log('err :>> ', err);
                    toast.error(err?.response?.data?.message)
                    if (err?.response?.data?.message === "Unauthorized user") {
                        navigate('/login')
                    }
                }),
            {
                loading: 'Adding to cart.......'
            }
        )
    }

    return (
        <div className="container mx-auto p-5">
            <div className='my-3'>
                <button
                    onClick={() => navigate(-1)}
                    className="btn bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md transition-all duration-200"
                >
                    <MoveLeft /> Go Back
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                <div className="flex">
                    <img
                        src={foodDetails?.image}
                        alt="Food"
                        className="w-full max-w-lg rounded-lg shadow-lg object-cover"
                    />
                </div>
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-gray-800">{foodDetails?.name}</h1>

                    <p className="text-xl text-green-600 font-semibold">
                        ₹{foodDetails?.price}
                    </p>

                    <p className="text-gray-600 text-lg leading-relaxed">
                        {foodDetails?.description}
                    </p>

                    <button onClick={addToCart} className="btn bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SingleFoodUser;
