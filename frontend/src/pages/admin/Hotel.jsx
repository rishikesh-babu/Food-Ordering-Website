import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/axiosInstance'
import { HotelCard } from '../../components/admin/CardsAdmin'

function Hotel() {
    console.log('Hotel')
    const [hotelDetails, setHotelDetails] = useState([])

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
                setHotelDetails(res?.data?.data)
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
            <div>
                {
                    hotelDetails.map((item, index) => <HotelCard image={item.image} name={item.name} hotelId={item._id} key={index} />)
                }
            </div>
        </div>
    )
}

export default Hotel
