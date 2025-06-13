import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import { HotelCard } from "../../components/admin/CardsAdmin";
import { useDispatch, useSelector } from "react-redux";
import { saveHotelDetails } from "../../redux/features/hotelSlice";
import { ModalHotelAdmin } from "../../components/admin/ModalAdmin";
import toast from "react-hot-toast";
import getFetch from "../../hooks/getFetch";

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
        <div className="mx-auto my-5 p-2 pb-3 pt-3 sm:px-3 md:px-5 max-w-3xl bg-gray-200 dark:bg-gray-700 rounded-2xl shadow-xl">
            <div className="text-2xl font-semibold text-center my-3 sm:text-3xl md:text-4xl">
                Hotels
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

            <div className="sm:mx-auto border-t-2 border-gray-400 flex flex-col">
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
        </div>
    );
}

export default Hotel;
