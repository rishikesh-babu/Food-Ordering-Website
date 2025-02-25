import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { Delete } from "lucide-react";
import { DeleteForever } from "@mui/icons-material";

function HotelRemoveButton({ hotelId }) {

    function handleHotelRemove() {
        const isConfirmed = window.confirm('Are you sure want to delete the hotel')
        if (isConfirmed) {
            toast.promise(
                axiosInstance({
                    method: 'DELETE',
                    url: `/hotel/delete-hotel/${hotelId}`
                })
                    .then((res) => {
                        console.log('res :>> ', res);
                    })
                    .catch((err) => {
                        console.log('err :>> ', err);
                        toast.error('Error!!')
                    }),
                {
                    loading: 'Deleting...'
                }
            )
        }
    }

    return (
        <div>
            <button onClick={() => handleHotelRemove()} className="btn btn-error">Delete</button>
        </div>
    )
}

function CreateHotelButton({ handleSubmit }) {
    return (
        <div>
            <button onClick={handleSubmit} className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200">
                Create Hotel
            </button>
        </div>
    );
}

function CreateFoodButton({ handleSubmit }) {
    return (
        <div className="flex justify-center mt-6">
            <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
            >
                Create Food
            </button>
        </div>
    );
}

function FoodRemoveButton({ foodId }) {

    function handleFoodDelete() {
        const confirm = window.confirm('Are you want to delete the food item')
        if (confirm) {
            toast.promise(
                axiosInstance({
                    method: 'DELETE',
                    url: `/hotel/delete-food/${foodId}`
                })
                    .then((res) => {
                        toast.success(res?.data?.message)
                    })
                    .catch((err) => {
                        toast.error('Error in deleting food Item')
                        console.log('err :>> ', err);
                    })
            )
        }
    }

    return (
        <div>
            <button onClick={() => handleFoodDelete()} className="btn btn-error">Remove</button>
        </div>
    )
}

function AddFoodItem({ hotelId }) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center mt-6">
            <button
                onClick={() => navigate(`/admin/create-food/${hotelId}`)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
                Create Food Item
            </button>
        </div>
    );
}



export {
    HotelRemoveButton,
    CreateHotelButton,
    AddFoodItem,
    FoodRemoveButton,
    CreateFoodButton,
};
