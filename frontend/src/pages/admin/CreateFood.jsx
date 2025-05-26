import React, { useEffect, useState } from 'react'
import { ImageTag, InputTag, TextArea } from '../../components/admin/InputAdmin'
import { CreateFoodButton } from '../../components/admin/ButtonAdmin'
import toast from 'react-hot-toast'
import axiosInstance from '../../config/axiosInstance'
import { useSelector } from 'react-redux'
import getFetch from '../../hooks/getFetch'
import { saveHotelDetails } from '../../redux/features/hotelSlice'

function CreateFood() {

    // const { hotelId } = useParams()
    const classname = "p-2.5 text-lg text-gray-500 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
        <div className="p-6 sm:max-w-xl my-4 mx-auto dark:bg-gray-700 rounded-lg shadow-lg">
            <div className="text-3xl font-semibold text-center mb-8">
                Create Food
            </div>
            <div className="flex flex-col gap-6">
                <div>
                    <label htmlFor="selecthotel" className='text-lg font-medium block'>
                        Select Hotel
                    </label>
                    <select
                        name="hotelId"
                        id="selecthotel"
                        className='p-2.5 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg sm:text-lg text-gray-500 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500'
                        onChange={handleDetails}
                    >
                        <option value={null}>Select</option>
                        {
                            hotelDetails?.map((item) => {
                                return <option value={item?._id}>{item?.name}</option>
                            })
                        }
                    </select>
                </div>
                <div>
                    <div className="text-lg font-medium">
                        Name
                    </div>
                    <InputTag
                        onInputChange={handleDetails}
                        name={'name'}
                        placeholder={'Enter Food Name'}
                        type={'text'}
                        classname={classname}
                    />
                </div>
                <div>
                    <div className="text-lg font-medium">
                        Price
                    </div>
                    <InputTag
                        onInputChange={handleDetails}
                        name={'price'}
                        placeholder={'Enter price'}
                        type={'number'}
                        classname={classname}
                    />
                </div>
                <div>
                    <div className="text-lg font-medium">
                        Description
                    </div>
                    <TextArea
                        onInputChange={handleDetails}
                        name={'description'}
                        placeholder={'Enter Description'}
                        type={'text'}
                        classname={classname}
                    />
                </div>
                <div>
                    <div className="text-lg font-medium">
                        Food Image
                    </div>
                    <ImageTag
                        onInputChange={handleFile}
                        className="p-3 border border-gray-300 rounded-lg"
                    />
                </div>
                <div className="mt-1 flex justify-between ">
                    <CreateFoodButton
                        handleSubmit={handleSubmit}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateFood
