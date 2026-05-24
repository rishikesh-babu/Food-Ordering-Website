import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import { HotelCard } from "../../components/admin/CardsAdmin";
import { useDispatch, useSelector } from "react-redux";
import { saveHotelDetails } from "../../redux/features/hotelSlice";
import { ModalHotelAdmin } from "../../components/admin/ModalAdmin";
import toast from "react-hot-toast";
import getFetch from "../../hooks/getFetch";
import { Building2 } from "lucide-react";

function Hotel() {
    const [hotelData, hotelDataLoading, hotelDataError] = getFetch('/hotel/get-all-hotels', saveHotelDetails)
    const { hotelDetails } = useSelector((state) => state.hotel); // For all hotel
    const [selectedHotelDetails, setSelectedHotelDetails] = useState(null); // For saving the updations
    const [selectedFile, setSelectedFile] = useState();
    const [previewImage, setPreviewImage] = useState(null);
    const dispatch = useDispatch();
    const clearFile = useRef();

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    function openUpdateHotelModal(hotel) {
        setSelectedFile(null);
        setPreviewImage(null);

        if (clearFile.current) {
            clearFile.current.value = null;
        }

        setSelectedHotelDetails({
            name: hotel.name || "",
            address: hotel.address || "",
            image: hotel?.image || "",
            hotelId: hotel?._id || "",
        });
        setTimeout(() => {
            document.getElementById("hotelAdmin_modal")?.showModal();
        }, 0);
    }


    function handleDetails(event) {
        setSelectedHotelDetails({
            ...selectedHotelDetails,
            [event.target.name]: event.target.value,
        });
    }

    function handleFile(value) {
        setSelectedFile(value);
        if (value) {
            const imageUrl = URL.createObjectURL(value);
            setPreviewImage(imageUrl);
        } else {
            setPreviewImage(null);
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        document.getElementById("hotelAdmin_modal")?.close();

        const formData = new FormData();

        formData.append("name", selectedHotelDetails?.name);
        formData.append("address", selectedHotelDetails?.address);
        formData.append("image", selectedFile);
        formData.append("hotelId", selectedHotelDetails?.hotelId);

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        toast.promise(
            axiosInstance({
                method: "PUT",
                url: "/hotel/update-hotel",
                data: formData,
            })
                .then((res) => {
                    // console.log("res.data?.data :>> ", res.data?.data);
                    toast.success(res?.data?.message);
                    const updatedHotel = hotelDetails?.map((hotel) =>
                        hotel?._id === res?.data?.data?._id ? res?.data?.data : hotel
                    );
                    dispatch(saveHotelDetails(updatedHotel));
                })
                .catch((err) => {
                    console.log("err :>> ", err);
                    toast.error(err?.response?.data?.message);
                }),
            {
                loading: "Updating Hotel",
            }
        );
    }

    return (
        <div className="min-h-screen py-10 transition-colors duration-300 relative overflow-hidden w-full">
            {/* Ambient Background Decorative Blobs */}
            {/* <div className="absolute top-1/4 left-10 w-96 h-96 bg-orange-400/5 dark:bg-orange-600/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-rose-400/5 dark:bg-rose-600/5 rounded-full blur-3xl pointer-events-none"></div> */}

            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2 font-outfit">
                            <Building2 className="w-8 h-8 text-orange-500" />
                            <span>Hotel Registry</span>
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Manage restaurant outlets, update details, and oversee branch status.
                        </p>
                    </div>
                </div>

                {selectedHotelDetails && (
                    <ModalHotelAdmin
                        selectedHotelDetails={selectedHotelDetails}
                        handleDetails={handleDetails}
                        handleFile={handleFile}
                        previewImage={previewImage}
                        handleSubmit={handleSubmit}
                        clearFile={clearFile}
                    />
                )}

                {hotelDataLoading ? (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-5 rounded-3xl shadow-sm animate-pulse flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div className="flex items-center gap-4 w-2/3">
                                    <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-2xl flex-shrink-0"></div>
                                    <div className="space-y-2 flex-grow">
                                        <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                        <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                    </div>
                                </div>
                                <div className="h-9 w-28 bg-slate-200 dark:bg-slate-800 rounded-2xl self-start sm:self-center"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4 flex flex-col">
                        {hotelDetails?.map((item, index) => (
                            <HotelCard
                                image={item?.image}
                                name={item?.name}
                                hotelId={item?._id}
                                key={index}
                                address={item?.address}
                                hotel={item}
                                openUpdateHotelModal={openUpdateHotelModal}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Hotel;
