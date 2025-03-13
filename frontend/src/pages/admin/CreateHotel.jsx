import React, { useEffect, useState } from 'react'
import { ImageTag, InputTag } from '../../components/admin/InputAdmin'
import { CreateHotelButton } from '../../components/admin/ButtonAdmin'
import axiosInstance from '../../config/axiosInstance'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function CreateHotel() {

    const [hotelDetails, setHotelDetails] = useState({})
    const [selectedFile, setSelectedFile] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        window.scroll(0, 0)
    }, [])

    function handleDetails(event) {
        setHotelDetails({
            ...hotelDetails,
            [event.target.name]: event.target.value
        })
    }

    function handleFile(value) {
        setSelectedFile(value)
    }

    function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData()

        formData.append('name', hotelDetails.name)
        formData.append('address', hotelDetails.address)
        formData.append('image', selectedFile)

        toast.promise(
            axiosInstance({
                method: 'POST',
                url: '/hotel/create-hotel',
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
                loading: 'Creating Hotel'
            }
        )
    }

    return (
        <div className="my-4 mx-auto p-6 max-w-fit shadow-lg rounded-lg dark:bg-gray-700">
            <div className="text-3xl font-semibold text-center mb-6">
                Create Hotel
            </div>
            <div className="flex flex-col gap-6">
                <div className="space-y-2">
                    <div className="text-lg font-medium ">
                        Hotel Name
                    </div>
                    <InputTag
                        onInputChange={handleDetails}
                        name={'name'}
                        placeholder={'Enter hotel name'}
                        type={'text'}
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <div className="text-lg font-medium">
                        Hotel Address
                    </div>
                    <InputTag
                        onInputChange={handleDetails}
                        name={'address'}
                        placeholder={'Enter hotel address'}
                        type={'text'}
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-2">
                    <div className="text-lg font-medium">
                        Hotel Image
                    </div>
                    <ImageTag
                        onInputChange={handleFile}
                        className="p-3 border border-gray-300 rounded-lg"
                    />
                </div>

                <div className="mt-6 ">
                    <CreateHotelButton
                        handleSubmit={handleSubmit}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateHotel
