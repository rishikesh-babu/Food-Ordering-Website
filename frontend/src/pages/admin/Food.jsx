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
        <div className='max-w-4xl m-2 sm:mx-auto dark:bg-gray-700 rounded-xl p-5'>
            <div className='text-4xl font-semibold text-center mb-6'>Food Items</div>
            <hr />
            <div>
                {
                    foodDetails?.map((item, index) => (
                        <FoodCard
                            image={item?.image}
                            name={item?.name}
                            price={item?.price}
                            foodId={item?._id}
                            key={index}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Food
