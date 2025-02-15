import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/axiosInstance'
import { HotelCard } from '../../components/admin/CardsAdmin'
import { useDispatch, useSelector } from 'react-redux'
import { saveHotelDetails } from '../../redux/features/hotelSlice'

function Hotel() {
    const dispatch = useDispatch()
    const { hotelDetails } = useSelector((state) => state.hotel)

    useEffect(() => {
        getHotel()
    }, [])

    function getHotel() {
        axiosInstance({
            method: 'GET',
            url: '/hotel/get-all-hotels'
        })
            .then((res) => {
                console.log('res?.data?.data :>> ', res?.data?.data);
                dispatch(saveHotelDetails(res?.data?.data))
            })
            .catch((err) => {
                console.log('err :>> ', err);
            })
    }

    console.log('hotelDetails :>> ', hotelDetails);

    return (
        <div>
            <div className='text-4xl font-semibold text-center m-10'>
                Hotels
            </div>
            <div className='m-4 sm:mx-6'>
                {
                    hotelDetails?.map((item, index) => <HotelCard image={item.image} name={item.name} hotelId={item._id} key={index} />)
                }
            </div>
        </div>
    )
}

export default Hotel
