import React, { useEffect, useRef, useState } from 'react'
import getFetch from '../../hooks/getFetch'
import { useDispatch, useSelector } from 'react-redux'
import { saveFoodDetails } from '../../redux/features/foodSlice'
import { FoodCard } from '../../components/admin/CardsAdmin'
import { ModalFoodAdmin } from '../../components/admin/ModalAdmin'
import { saveHotelDetails } from '../../redux/features/hotelSlice'
import toast from 'react-hot-toast'
import axiosInstance from '../../config/axiosInstance'
import { Pizza } from 'lucide-react';

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

    // console.log('hotelDetails :>> ', hotelDetails);

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
        // console.log('file :>> ', file);
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
        <div className="min-h-screen py-10 transition-colors duration-300 relative overflow-hidden w-full">
            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2 font-outfit">
                            <Pizza className="w-8 h-8 text-orange-500" />
                            <span>Food Catalog</span>
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Browse, manage, and update individual food dishes across your registered hotel branches.
                        </p>
                    </div>
                </div>

                {/* Branch Hotel Filter Card */}
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-100 dark:border-slate-800/80 p-5 rounded-3xl shadow-sm mb-8 transition-all duration-300 hover:shadow-md">
                    <label
                        htmlFor="hotelSelect"
                        className="block mb-2 text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wider font-outfit"
                    >
                        Filter by Branch Hotel
                    </label>
                    <div className="relative">
                        <select
                            id="hotelSelect"
                            className="w-full pl-4 pr-10 py-3 bg-slate-200 dark:bg-slate-950 border border-slate-100/60 dark:border-slate-800 rounded-2xl text-sm focus:outline-none focus:border-orange-500/50 dark:focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 dark:focus:ring-orange-500/10 text-slate-700 dark:text-slate-200 transition-all cursor-pointer appearance-none font-bold font-outfit"
                            value={selectedHotel}
                            onChange={(e) => setSelectedHotel(e.target.value)}
                        >
                            <option value="All">All Hotels</option>
                            {hotelDetails?.map((item) => (
                                <option key={item._id} value={item?._id}>
                                    {item?.name}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-450">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <ModalFoodAdmin
                    selectFoodDetails={selectFoodDetails}
                    handleDetails={handleDetails}
                    handleFile={handleFile}
                    previewImage={previewImage}
                    handleSubmit={handleSubmit}
                />

                {/* Food Card List Wrapper */}
                {isFoodLoading ? (
                    <div className="space-y-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-5 rounded-3xl shadow-sm animate-pulse flex flex-row justify-between items-center gap-4">
                                <div className="flex items-center gap-4 w-2/3">
                                    <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-2xl flex-shrink-0"></div>
                                    <div className="space-y-2 flex-grow">
                                        <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                        <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                    </div>
                                </div>
                                <div className="h-9 w-24 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
                            </div>
                        ))}
                    </div>
                ) : filteredFood?.length ? (
                    <div className="space-y-4 flex flex-col">
                        {filteredFood?.map((item) => (
                            <FoodCard
                                image={item?.image}
                                name={item?.name}
                                price={item?.price}
                                foodId={item?._id}
                                food={item}
                                openUpdateFoodModal={openUpdateFoodModal}
                                key={item?._id}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl text-center shadow-sm">
                        <Pizza size={48} className="text-slate-300 dark:text-slate-700 mb-4" />
                        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 font-outfit">No Dishes Found</h3>
                        <p className="text-sm text-slate-450 dark:text-slate-500 mt-1 max-w-xs px-4">
                            There are no food items listed under this branch selection.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Food
