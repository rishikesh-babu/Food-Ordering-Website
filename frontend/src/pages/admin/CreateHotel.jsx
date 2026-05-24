import React, { useEffect, useState } from 'react'
import { ImageTag, InputTag } from '../../components/admin/InputAdmin'
import { CreateHotelButton } from '../../components/admin/ButtonAdmin'
import { Building2 } from 'lucide-react'
import axiosInstance from '../../config/axiosInstance'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function CreateHotel() {

    const classname = "w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm focus:outline-none focus:border-orange-500/50 dark:focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/10 dark:focus:ring-orange-500/10 text-slate-600 dark:text-slate-200 transition-all font-semibold font-outfit"
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
        <div className="min-h-screen py-12 transition-colors duration-300 relative overflow-hidden w-full">
            {/* Decorative background blobs */}
            <div className="absolute top-1/4 left-10 w-96 h-96 bg-orange-400/5 dark:bg-orange-600/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-rose-400/5 dark:bg-rose-600/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-xl relative z-10">
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-100 dark:border-slate-800/80 p-8 rounded-3xl shadow-xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex p-3 bg-orange-500/10 rounded-2xl text-orange-500 mb-3">
                            <Building2 size={28} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight font-outfit">
                            Add New Hotel
                        </h2>
                        <p className="text-xs text-slate-450 dark:text-slate-500 mt-1.5">
                            Register a new branch location into the food delivery network
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="space-y-1.5">
                            <label className="block font-extrabold text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wider font-outfit">
                                Hotel Name
                            </label>
                            <InputTag
                                onInputChange={handleDetails}
                                name={'name'}
                                placeholder={'Enter hotel name'}
                                type={'text'}
                                classname={classname}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block font-extrabold text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wider font-outfit">
                                Hotel Address
                              </label>
                            <InputTag
                                onInputChange={handleDetails}
                                name={'address'}
                                placeholder={'Enter hotel address'}
                                type={'text'}
                                classname={classname}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block font-extrabold text-sm text-slate-600 dark:text-slate-400 uppercase tracking-wider font-outfit">
                                Hotel Image
                            </label>
                            <ImageTag
                                onInputChange={handleFile}
                                className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-sm transition-all focus:outline-none cursor-pointer"
                            />
                        </div>

                        <div className="mt-4">
                            <CreateHotelButton handleSubmit={handleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateHotel
