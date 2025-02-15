import React from 'react'
import axiosInstance from '../../config/axiosInstance'
import getFetch from '../../hooks/getFetch'
import { useSelector } from 'react-redux'
import { saveFoodDetails } from '../../redux/features/foodSlice'
import { FoodCard } from '../../components/admin/CardsAdmin'

function Food() {
    const [foodData, isFoodLoading, foodError] = getFetch('/hotel/get-all-food-admin', saveFoodDetails)
    const { foodDetails } = useSelector((state) => state.food)
    return (
        <div>
            <div className='text-4xl font-semibold text-center m-10'>Food Items</div>
            <div className='mx-2 grid grid-cols-1 gap-7 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-7'>
                {
                    foodDetails?.map((item, index) => (
                        <FoodCard
                            image={item?.image}
                            name={item?.name}
                            price={item?.price}
                            foodId={item?._id}
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Food
