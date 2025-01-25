import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/axiosInstance'
import { useParams } from 'react-router-dom'
import { UserFoodCard } from '../../components/user/CardsUser'
import toast from 'react-hot-toast'
import { saveCartDetails } from '../../redux/features/cartSlice'
import { useDispatch } from 'react-redux'
import { SingleHotelSkelton } from '../../components/user/Skelton'
import getFetch from '../../hooks/getFetch'

function SingleHotelUser() {

    const [hotelDetails, setHotelDetails] = useState()
    const { hotelId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        getSingleHotel()
    }, [])

    function getSingleHotel() {
        axiosInstance({
            method: 'GET',
            url: `/hotel/single-hotel/${hotelId}`
        })
            .then((res) => {
                console.log('res :>> ', res);
                setHotelDetails(res?.data?.data)
            })
            .catch((err) => {
                console.log('err :>> ', err);
            })
    }

    function addToCart(foodId) {
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
        <div>
            {
                !hotelDetails ? (
                    <SingleHotelSkelton />
                ) : (
                    <div>
                        <div className="bg-gray-700 p-2 grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="self-stretch flex justify-center">
                                <img
                                    className="w-full h-auto rounded-xl object-cover"
                                    src={hotelDetails?.image}
                                    alt="Hotel Image"
                                />
                            </div>
                            <div className="text-white flex flex-col justify-center m-7 space-y-4">
                                <div className="text-3xl font-semibold">
                                    {hotelDetails?.name}
                                </div>
                                <div className="text-lg text-gray-300">
                                    {hotelDetails?.address}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {hotelDetails?.foodItems?.map((item, index) => (
                                <UserFoodCard
                                    key={index}
                                    name={item?.foodId?.name}
                                    price={item?.foodId.price}
                                    image={item?.foodId?.image}
                                    foodId={item?.foodId?._id}
                                    addToCart={addToCart}
                                />
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default SingleHotelUser
