import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ImageTag, InputTag } from '../../components/admin/InputAdmin'
import { CreateFoodButton } from '../../components/admin/ButtonAdmin'
import toast from 'react-hot-toast'
import axiosInstance from '../../config/axiosInstance'
import { BackButton } from '../../components/user/ButtonUser'

function CreateFood() {

    const [foodDetails, setFoodDetails] = useState({})
    const [selectedFile, setSelectedFile] = useState()
    const { hotelId } = useParams()
    const navigate = useNavigate()

    function handleDetails(name, value) {
        setFoodDetails({
            ...foodDetails,
            [name]: value
        })
    }

    function handleFile(value) {
        setSelectedFile(value)
    }

    function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData()

        formData.append('name', foodDetails.name)
        formData.append('price', foodDetails.price)
        formData.append('description', foodDetails.description)
        formData.append('image', selectedFile)

        toast.promise(

            axiosInstance({
                method: 'POST',
                url: `/hotel/create-food/${hotelId}`,
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
        <div className="max-w-fit my-4 mx-auto p-6 dark:bg-gray-700 rounded-lg shadow-lg">
            <div className="text-3xl font-semibold text-center mb-8">
                Create Food
            </div>
            <div className="flex flex-col  gap-6">
                <div>
                    <div className="text-lg font-medium">
                        Name
                    </div>
                    <InputTag
                        onInputChange={handleDetails}
                        name={'name'}
                        placeholder={'Enter Food Name'}
                        type={'text'}
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <div className="text-lg font-medium">
                        Description
                    </div>
                    <InputTag
                        onInputChange={handleDetails}
                        name={'description'}
                        placeholder={'Enter Description'}
                        type={'text'}
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <div className="mt-6 flex justify-between">
                    <CreateFoodButton
                        handleSubmit={handleSubmit}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <BackButton />
                </div>
            </div>
        </div>


        // <div>
        //     <div className='text-2xl font-semibold text-center'>
        //         Create Food
        //     </div>
        //     <div className='flex flex-col m-7 gap-5'>
        //         <div>
        //             <div>
        //                 Name
        //             </div>
        //             <InputTag onInputChange={handleDetails} name={'name'} placeholder={'Enter Food Name'} type={'text'} />
        //         </div>
        //         <div>
        //             <div>
        //                 Description
        //             </div>
        //             <InputTag onInputChange={handleDetails} name={'description'} placeholder={'Enter Description'} type={'text'} />
        //         </div>
        //         <div>
        //             <div>
        //                 Price
        //             </div>
        //             <InputTag onInputChange={handleDetails} name={'price'} placeholder={'Enter price'} type={'number'} />
        //         </div>
        //         <div>
        //             <div>
        //                 Food Image
        //             </div>
        //             <ImageTag onInputChange={handleFile} />
        //         </div>
        //         <div>
        //             <CreateFoodButton handleSubmit={handleSubmit} />
        //         </div>
        //     </div>
        // </div>
    )
}

export default CreateFood
