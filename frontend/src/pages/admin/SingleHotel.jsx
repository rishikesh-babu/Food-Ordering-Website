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

        <div className="p-14">
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

            <div className="m-7">
                <AddFoodItem hotelId={hotelId} />
            </div>

            <div className="m-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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


            {/* <div className="m-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    hotelDetails?.foodItems?.map((item, index) => (
                        <FoodCard
                            image={item?.foodId?.image}
                            name={item?.foodId?.name}
                            price={item?.foodId?.price}
                            key={index}
                        />
                    ))
                }
            </div> */}
        </div>



        // <div>
        //     <div className='bg-gray-700 p-14 grid grid-cols-2'>
        //         <div className='self-stretch'>
        //             <img
        //                 className='size-fit rounded-xl'
        //                 src={hotelDetails?.image}
        //                 alt="Image"
        //             />
        //         </div>
        //         <div className='text-white m-7 flex flex-col justify-around'>
        //             <div className='text-3xl'>
        //                 {hotelDetails?.name}
        //             </div>
        //             <div className='text-lg'>
        //                 {hotelDetails?.address}
        //             </div>
        //         </div>
        //     </div>
        //     <div className='m-7'>
        //         <AddFoodItem hotelId={hotelId} />
        //     </div>
        //     <div>
        //         {
        //             hotelDetails?.foodItems?.map((item, index) => <FoodCard image={item?.foodId?.image} name={item?.foodId?.name} price={item?.foodId?.price} key={index} /> )
        //         }
        //     </div>
        // </div>
    )
}

export default SingleHotel
