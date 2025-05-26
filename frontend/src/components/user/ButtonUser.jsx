import { Edit, LogOut, MinusSquare, PlusSquare } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";
import { useDispatch } from "react-redux";
import { clearUserData } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";

function IncreaseQuantityButton({ foodId, updateCartDetails }) {
    function addtocart(foodId) {
        toast.promise(
            axiosInstance({
                method: "POST",
                url: "cart/add-to-cart",
                data: { foodId },
            })
                .then((res) => {
                    console.log("res :>> ", res);
                    toast.success(res?.data?.message);
                    updateCartDetails(res?.data?.data);
                })
                .catch((err) => {
                    console.log("err :>> ", err);
                    toast.error(err?.response?.data?.message);
                }),
            {
                loading: "Adding to cart....",
            }
        );
    }

    return (
        <div
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-400 hover:bg-gray-400 dark:hover:bg-gray-200 transition-all duration-300 cursor-pointer"
            onClick={() => addtocart(foodId)}
        >
            <PlusSquare strokeWidth={2} size={24} className="text-black" />
        </div>
    );
}

function DecreaseQuantityButton({ foodId, updateCartDetails }) {
    function removeFromCart(foodId) {
        toast.promise(
            axiosInstance({
                method: "DELETE",
                url: "cart/remove-cart-item",
                data: { foodId },
            })
                .then((res) => {
                    console.log("res :>> ", res);
                    toast.success(res?.data?.message);
                    updateCartDetails(res?.data?.data);
                })
                .catch((err) => {
                    console.log("err :>> ", err);
                    toast.error(err?.response?.data?.message);
                }),
            {
                loading: "Removing from cart....",
            }
        );
    }

    return (
        <div
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-400 hover:bg-gray-400 dark:hover:bg-gray-200 transition-all duration-300 cursor-pointer"
            onClick={() => removeFromCart(foodId)}
        >
            <MinusSquare strokeWidth={2} size={24} className="text-black" />
        </div>
    );
}

function LogoutButton() {

    const dispatch = useDispatch()

    function logout() {
        toast.promise(
            axiosInstance({
                method: 'POST',
                url: 'user/logout'
            })
                .then((res) => {
                    console.log('res :>> ', res);
                    toast.success(res?.data?.message)
                    dispatch(clearUserData())
                })
                .catch((err) => {
                    console.log('err :>> ', err);
                })
        )
    }

    return (
        <div className="mt-3 flex justify-center">
            <button
                onClick={logout}
                className="flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 
                   bg-gradient-to-r from-red-500 to-red-600 text-white hover:scale-105 hover:shadow-xl active:scale-95 
                   dark:from-red-600 dark:to-red-700 dark:shadow-md dark:hover:shadow-lg"
            >
                <LogOut className="w-6 h-6" />
                <span>Logout</span>
            </button>
        </div>
    );
}

function EditProfileButton() {
    return (
        <div className="mt-3 flex justify-center">
            <button // bg-gradient-to-r from-gray-300 to-gray-400
                className="flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out
                    text-gray-900 hover:scale-105 hover:shadow-lg hover:from-gray-400 hover:to-gray-500 
                   active:scale-95 active:shadow-sm bg-gray-300 hover:dark:bg dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:shadow-md dark:hover:shadow-lg dark:bg-none"
            >
                <Edit className="w-6 h-6" />
                <span>Edit</span>
            </button>
        </div>

    )
}

function UpdateProfile({ handleSubmit }) {
    return (
        <div className="flex justify-center mt-6">
            <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
            >
                Update
            </button>
        </div>
    );
}

function BackButton() {
    const navigate = useNavigate()
    return (
        <div className="flex justify-center mt-6">
            <button
                onClick={() => navigate(-1)}
                className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
            >
                Back
            </button>
        </div>
    );
}


export { IncreaseQuantityButton, DecreaseQuantityButton, LogoutButton, EditProfileButton, UpdateProfile, BackButton };