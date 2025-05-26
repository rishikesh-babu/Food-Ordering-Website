import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../config/axiosInstance'
import toast from 'react-hot-toast'
import { FoodCard } from '../../components/admin/CardsAdmin'
import { AddFoodItem } from '../../components/admin/ButtonAdmin'
import getFetch from '../../hooks/getFetch'

function SingleHotel() {

    // const [hotelDetails, setHotelDetails] = useState({})
    const { hotelId } = useParams()
    const navigate = useNavigate()
    const [hotelDetails, isHotelLoading, hotelError] = getFetch(`hotel/single-hotel/${hotelId}`)
    const [foodDetails, isFoodloading, foodError] = getFetch(`hotel/single-hotel-food/${hotelId}`)


    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    // function getSingleHotelDetails() {
    //     axiosInstance({
    //         method: 'GET',
    //         url: `hotel/single-hotel/${hotelId}`,
    //     })
    //         .then((res) => {
    //             console.log('res?.data?.data :>> ', res?.data?.data);
    //             setHotelDetails(res?.data?.data)
    //         })
    //         .catch((err) => {
    //             console.log('err :>> ', err);
    //             toast.error(err?.response?.data?.message)
    //             navigate(-1)
    //         })
    // }

    return (
        <div className="p-1 min-h-screen flex flex-col items-center">
            <div className=" dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
                <div className="relative">
                    <img
                        src={hotelDetails?.image}
                        alt="Hotel Image"
                        className="w-full h-64 object-cover rounded-lg"
                    />
                </div>
                <div className="p-6 text-center">
                    <h2 className="text-3xl font-semibold ">{hotelDetails?.name}</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">{hotelDetails?.address}</p>
                </div>
            </div>

            <div className="mt-6 w-full max-w-4xl">
                <AddFoodItem hotelId={hotelId} />
            </div>

            <div className="mt-6 bg-gray-200 dark:bg-gray-700 w-full max-w-4xl p-4 rounded-lg shadow-md">
                <h3 className="text-xl text-center dark:text-gray-300 font-semibold mb-4 sm:text-2xl md:text-3xl">Food Items</h3>
                <hr className='border border-gray-400' />
                <div className="overflow-x-auto">
                    {foodDetails?.map((item, index) => (
                        <FoodCard
                            image={item?.image}
                            name={item?.name}
                            price={item?.price}
                            foodId={item?._id}
                            key={item?._id}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SingleHotel
