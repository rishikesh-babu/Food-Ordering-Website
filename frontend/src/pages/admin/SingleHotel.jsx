import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../config/axiosInstance'
import toast from 'react-hot-toast'
import { FoodCard } from '../../components/admin/CardsAdmin'
import { AddFoodItem } from '../../components/admin/ButtonAdmin'

function SingleHotel() {

    const [hotelDetails, setHotelDetails] = useState({})

    const { hotelId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getSingleHotelDetails()
    }, [hotelId])

    function getSingleHotelDetails() {
        axiosInstance({
            method: 'GET',
            url: `hotel/single-hotel/${hotelId}`,
        })
            .then((res) => {
                console.log('res?.data?.data :>> ', res?.data?.data);
                setHotelDetails(res?.data?.data)
            })
            .catch((err) => {
                console.log('err :>> ', err);
                toast.error(err?.response?.data?.message)
                navigate(-1)
            })
    }
    return (

        <div className="p-3">
            <div className="bg-gray-700 p-2 grid grid-cols-1 md:grid-cols-2 gap-10 rounded-xl">
                <div className="flex justify-center">
                    <img
                        className="size-fit rounded-xl"
                        src={hotelDetails?.image}
                        alt="Hotel Image"
                    />
                </div>
                <div className="text-white flex flex-col text-center md:text-left justify-center m-7 space-y-4">
                    <div className="text-3xl font-semibold">
                        {hotelDetails?.name}
                    </div>
                    <div className="text-lg text-gray-300">
                        {hotelDetails?.address}
                    </div>
                </div>
            </div>

            <div className="m-7">
                <AddFoodItem hotelId={hotelId} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    hotelDetails?.foodItems?.map((item, index) => (
                        <FoodCard
                            image={item?.foodId?.image}
                            name={item?.foodId?.name}
                            price={item?.foodId?.price}
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default SingleHotel
