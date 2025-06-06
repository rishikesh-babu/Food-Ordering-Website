import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/axiosInstance'
import { useNavigate, useParams } from 'react-router-dom'
import { UserFoodCard } from '../../components/user/CardsUser'
import toast from 'react-hot-toast'
import { saveCartDetails } from '../../redux/features/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { SingleHotelSkelton } from '../../components/user/Skelton'
import getFetch from '../../hooks/getFetch'
import { saveHotelDetails } from '../../redux/features/hotelSlice'

function SingleHotelUser() {
    
    const { hotelId } = useParams()
    const [hotelDetails, hotelDetailsLoading, hotelDetailsError] = getFetch(`/hotel/single-hotel/${hotelId}`)
    const [foodDetails, setFoodDetails] = useState([])
    const [foodData, foodDataLoading, foodDataError] = getFetch(`/hotel/single-hotel-food/${hotelId}`)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        window.scroll(0, 0)
    }, [])

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
                    if (err?.response?.data?.message === 'Unauthorized user') {
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
                    <div className='flex flex-col gap-5 m-2 sm:m-5'>
                        <div className="bg-gray-700 p-2 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-10">
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
                        <div className='self-center text-3xl font-bold font-mono text-gray-700 dark:text-gray-200 sm:hidden tracking-widest'>
                            Food Items
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {foodData?.map((item, index) => (
                                <UserFoodCard
                                    key={index}
                                    name={item?.name}
                                    price={item?.price}
                                    image={item?.image}
                                    foodId={item?._id}
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
