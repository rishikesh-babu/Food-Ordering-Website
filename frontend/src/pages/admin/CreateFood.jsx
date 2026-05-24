import React, { useEffect, useState } from 'react'
import { ImageTag, InputTag, TextArea } from '../../components/admin/InputAdmin'
import { CreateFoodButton } from '../../components/admin/ButtonAdmin'
import toast from 'react-hot-toast'
import axiosInstance from '../../config/axiosInstance'
import { useSelector } from 'react-redux'
import getFetch from '../../hooks/getFetch'
import { saveHotelDetails } from '../../redux/features/hotelSlice'
import { Pizza } from 'lucide-react'

function CreateFood() {

    // const { hotelId } = useParams()
    const classname = "w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm focus:outline-none focus:border-orange-500/50 dark:focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 dark:focus:ring-orange-500/10 text-slate-700 dark:text-slate-200 transition-all font-semibold font-outfit"
    const [hotelData, hotelDataLoading, hotelDataError] = getFetch('/hotel/get-all-hotels', saveHotelDetails)
    const { hotelDetails } = useSelector((state) => state.hotel)
    const [foodDetails, setFoodDetails] = useState({})
    const [selectedFile, setSelectedFile] = useState()

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    function handleDetails(event) {
        setFoodDetails({
            ...foodDetails,
            [event.target.name]: event.target.value
        })
        console.log('foodDetails :>> ', foodDetails);
    }

    function handleFile(value) {
        setSelectedFile(value)
    }

    function handleSubmit(event) {
        event.preventDefault()

        if (!foodDetails.hotelId) {
            return toast.error("Please select hotel !!!!")
        }
        if (!foodDetails.name) {
            return toast.error("Please Enter name !!!")
        }
        if (!foodDetails.description) {
            return toast.error("Please enter description !!!")
        }
        if (!foodDetails.price) {
            return toast.error('Please enter the price !!!!')
        }
        if (!selectedFile) {
            return toast.error("Please select image !!!")
        }

        const formData = new FormData()

        formData.append('hotelId', foodDetails.hotelId)
        formData.append('name', foodDetails.name)
        formData.append('price', foodDetails.price)
        formData.append('description', foodDetails.description)
        formData.append('image', selectedFile)


        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        toast.promise(
            axiosInstance({
                method: 'POST',
                url: 'hotel/create-food',
                data: formData,
            })
                .then((res) => {
                    console.log('res :>> ', res);
                    toast.success(res?.data?.message)
                })
                .catch((err) => {
                    console.log('err :>> ', err);
                    toast.error(err?.response?.data?.message)
                }),
            {
                loading: 'Creating Food Item'
            }

        )
    }
    return (
        <div className="min-h-screen py-12 transition-colors duration-300 relative overflow-hidden w-full">
            {/* Decorative background blobs */}
            <div className="absolute top-1/4 left-10 w-96 h-96 bg-orange-400/5 dark:bg-orange-600/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-rose-400/5 dark:bg-rose-600/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-xl relative z-10">
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-100 dark:border-slate-800/80 p-8 rounded-3xl shadow-xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex p-3 bg-orange-500/10 rounded-2xl text-orange-500 mb-3">
                            <Pizza size={28} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight font-outfit">
                            Add New Dish
                        </h2>
                        <p className="text-xs text-slate-450 dark:text-slate-500 mt-1.5">
                            Create and associate a new menu food item with a registered hotel
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="space-y-1.5">
                            <label htmlFor="selecthotel" className="block font-extrabold text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wider font-outfit">
                                Select Hotel Branch
                            </label>
                            <div className="relative">
                                <select
                                    name="hotelId"
                                    id="selecthotel"
                                    className="w-full pl-4 pr-10 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm focus:outline-none focus:border-orange-500/50 dark:focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 dark:focus:ring-orange-500/10 text-slate-700 dark:text-slate-200 transition-all cursor-pointer appearance-none font-bold font-outfit"
                                    onChange={handleDetails}
                                >
                                    <option value="">Select Hotel</option>
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

                        <div className="space-y-1.5">
                            <label className="block font-extrabold text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wider font-outfit">
                                Food Name
                            </label>
                            <InputTag
                                onInputChange={handleDetails}
                                name={'name'}
                                placeholder={'Enter food item name'}
                                type={'text'}
                                classname={classname}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block font-extrabold text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wider font-outfit">
                                Price (INR)
                            </label>
                            <InputTag
                                onInputChange={handleDetails}
                                name={'price'}
                                placeholder={'Enter price'}
                                type={'number'}
                                classname={classname}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block font-extrabold text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wider font-outfit">
                                Description
                            </label>
                            <TextArea
                                onInputChange={handleDetails}
                                name={'description'}
                                placeholder={'Enter dish details / ingredients'}
                                type={'text'}
                                classname={classname}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block font-extrabold text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wider font-outfit">
                                Dish Image
                            </label>
                            <ImageTag
                                onInputChange={handleFile}
                                className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-sm transition-all focus:outline-none cursor-pointer"
                            />
                        </div>

                        <div className="mt-4">
                            <CreateFoodButton handleSubmit={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateFood
