import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { DeleteForever } from "@mui/icons-material";

function HotelRemoveButton({ hotelId }) {
    function handleHotelRemove() {
        // window.confirm("Temperarly closed");
        // return;
        const isConfirmed = window.confirm("Are you sure want to delete the hotel");
        return
        if (isConfirmed) {
            toast.promise(
                axiosInstance({
                    method: "DELETE",
                    url: `/hotel/delete-hotel/${hotelId}`,
                })
                    .then((res) => {
                        console.log("res :>> ", res);
                        toast.success(res?.data?.message)
                    })
                    .catch((err) => {
                        console.log("err :>> ", err);
                        toast.error(err?.response?.data?.message);
                    }),
                {
                    loading: "Deleting...",
                }
            );
        }
    }

    return (
        <button
            onClick={() => handleHotelRemove()}
            className="hover:scale-110 text-red-600"
        >
            <DeleteForever fontSize="medium" />
        </button>
    );
}

function CreateHotelButton({ handleSubmit, value }) {
    return (
        <button
            onClick={handleSubmit}
            className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-2xl font-black text-sm tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-md shadow-orange-500/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500/20"
        >
            {value ?? "Create Hotel"}
        </button>
    );
}

function CreateFoodButton({ handleSubmit, value }) {
    return (
        <button
            onClick={handleSubmit}
            className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-2xl font-black text-sm tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-md shadow-orange-500/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500/20"
        >
            {value ?? 'Create Food Item'}
        </button>
    );
}

function FoodRemoveButton({ foodId }) {
    function handleFoodDelete() {
        const confirm = window.confirm("Are you want to delete the food item");
        if (confirm) {
            toast.promise(
                axiosInstance({
                    method: "DELETE",
                    url: `/hotel/delete-food/${foodId}`,
                })
                    .then((res) => {
                        toast.success(res?.data?.message);
                    })
                    .catch((err) => {
                        toast.error("Error in deleting food Item");
                        console.log("err :>> ", err);
                    })
            );
        }
    }

    return (
        <button onClick={() => handleFoodDelete()} className="hover:scale-110 text-red-600 ">
            <DeleteForever />
        </button>
    );
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
