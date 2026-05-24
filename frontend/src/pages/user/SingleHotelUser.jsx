import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/axiosInstance'
import { useNavigate, useParams } from 'react-router-dom'
import { UserFoodCard } from '../../components/user/CardsUser'
import toast from 'react-hot-toast'
import { saveCartDetails } from '../../redux/features/cartSlice'
import { useDispatch } from 'react-redux'
import { SingleHotelSkelton } from '../../components/user/Skelton'
import getFetch from '../../hooks/getFetch'
import { MapPin, Utensils } from 'lucide-react'

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

    if (hotelDetailsLoading) {
        return <SingleHotelSkelton />;
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900/50 py-10 transition-colors duration-300">
            {
                !hotelDetails ? (
                    <SingleHotelSkelton />
                ) : (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Hero Banner */}
                        <div className="relative overflow-hidden rounded-3xl shadow-lg h-64 sm:h-80 mb-10 group">
                            {/* Background Image */}
                            <img
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                src={hotelDetails?.image}
                                alt={hotelDetails?.name || "Hotel Banner"}
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent z-[1]" />
                            
                            {/* Hotel Details Overlaid */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-[2] flex flex-col justify-end">
                                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-outfit drop-shadow-sm">
                                    {hotelDetails?.name || "Restaurant"}
                                </h1>
                                <p className="text-sm sm:text-base text-gray-200 mt-2 font-medium drop-shadow-sm flex items-center gap-1.5">
                                    <MapPin size={16} className="text-amber-500" />
                                    {hotelDetails?.address || "Address unavailable"}
                                </p>
                            </div>
                        </div>

                        {/* Title: Menu Section */}
                        <div className="flex items-center gap-2 mb-6">
                            <Utensils className="text-amber-500 size-6" />
                            <h2 className="text-2xl sm:text-3xl font-black text-gray-800 dark:text-white font-outfit tracking-tight">
                                Available Dishes
                            </h2>
                        </div>

                        {/* Food Items Grid */}
                        {foodDataLoading ? (
                            <div className="py-10 text-center text-gray-500">Loading food items...</div>
                        ) : foodData?.length === 0 ? (
                            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                                <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No dishes are currently available from this restaurant.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                                {foodData?.map((item, index) => (
                                    <UserFoodCard
                                        key={index}
                                        name={item?.name}
                                        price={item?.price}
                                        image={item?.image}
                                        foodId={item?._id}
                                        addToCart={addToCart}
                                        description={item?.description}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    )
}

export default SingleHotelUser
