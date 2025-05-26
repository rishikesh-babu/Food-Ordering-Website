import React, { useEffect, useRef, useState } from 'react'
import getFetch from '../../hooks/getFetch'
import { useDispatch, useSelector } from 'react-redux'
import { saveFoodDetails } from '../../redux/features/foodSlice'
import { FoodCard } from '../../components/admin/CardsAdmin'
import { ModalFoodAdmin } from '../../components/admin/ModalAdmin'
import { saveHotelDetails } from '../../redux/features/hotelSlice'
import toast from 'react-hot-toast'
import axiosInstance from '../../config/axiosInstance'

function Food() {
    const [foodData, isFoodLoading, foodError] = getFetch('/hotel/get-all-food-admin', saveFoodDetails)
    const [hotelData, hotelDataLoading, hotelDataError] = getFetch('/hotel/get-all-hotels', saveHotelDetails)
    const { foodDetails } = useSelector((state) => state.food)
    const { hotelDetails } = useSelector((state) => state.hotel)
    const [selectedHotel, setSelectedHotel] = useState('All')
    const [selectFoodDetails, setSelectFoodDetails] = useState(null)
    const [selectFoodImage, setSelectFoodImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const dispatch = useDispatch()
    const clearFile = useRef()

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    console.log('hotelDetails :>> ', hotelDetails);

    const filteredFood = selectedHotel === 'All' ? foodDetails : foodDetails.filter(item => item.hotelId === selectedHotel)

    function openUpdateFoodModal(food) {
        setSelectFoodImage(null)
        setPreviewImage(null) 

        if (clearFile?.current) {
            clearFile.current.value = null
        }

        setSelectFoodDetails({
            foodId: food?._id || '',
            name: food?.name || '',
            price: food?.price || '',
            description: food?.description || '',
            image: food?.image || '',
        })
        document.getElementById('foodAdmin_modal')?.showModal()
    }

    function handleFile(file) {
        console.log('file :>> ', file);
        setSelectFoodImage(file)
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setPreviewImage(imageUrl)
        } else {
            setPreviewImage(null)
        }
    }

    function handleDetails(event) {
        setSelectFoodDetails({
            ...selectFoodDetails,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        document.getElementById('foodAdmin_modal')?.close()

        const formData = new FormData()

        formData.append('name', selectFoodDetails?.name)
        formData.append('price', selectFoodDetails?.price)
        formData.append('description', selectFoodDetails?.description)
        formData.append('image', selectFoodImage)
        formData.append('foodId', selectFoodDetails?.foodId)

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        toast.promise(
            axiosInstance({
                method: 'PUT',
                url: '/hotel/update-food',
                data: formData,
            })
                .then((res) => {
                    toast.success(res?.data?.message)
                    const updatedFood = foodDetails?.map((food) => 
                        food._id === res?.data?.data?._id ? res?.data?.data : food
                    )
                    dispatch(saveFoodDetails(updatedFood))                    
                })
                .catch((err) => {
                    console.log('err :>> ', err);
                    toast.error(err?.response?.data?.message)   
                }),
            {
                loading: 'Updating food'
            }
        )
    }

    return (
        <div className='mt-4 px-1 py-3 max-w-3xl rounded-xl sm:mx-auto'>
            <div className='text-2xl font-semibold text-center mb-6 rounded-md py-5 bg-gray-200 dark:bg-gray-700 '>Food Items</div>

            <div className='mb-6'>
                <label
                    htmlFor="hotelSelect"
                    className='block mb-2 text-sm sm:text-lg font-medium text-gray-700 dark:text-gray-200'
                >
                    Select Hotel
                </label>
                <select
                    id="hotelSelect"
                    className='w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm sm:text-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    value={selectedHotel}
                    onChange={(e) => setSelectedHotel(e.target.value)}
                >
                    <option value="All">All</option>
                    {
                        hotelDetails?.map((item) => (<option key={item._id} value={item?._id}>{item?.name}</option>))
                    }
                </select>
            </div>

            <ModalFoodAdmin
                selectFoodDetails={selectFoodDetails}
                handleDetails={handleDetails}
                handleFile={handleFile}
                previewImage={previewImage}
                handleSubmit={handleSubmit}
            />

            <div className='p-2 sm:px-3 md:px-5 border-t-2 rounded-lg border-gray-400 bg-gray-200 dark:bg-gray-700'>
                {
                    filteredFood?.map((item) => (
                        <FoodCard
                            image={item?.image}
                            name={item?.name}
                            price={item?.price}
                            foodId={item?._id}
                            food={item}
                            openUpdateFoodModal={openUpdateFoodModal}
                            key={item?._id}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Food
