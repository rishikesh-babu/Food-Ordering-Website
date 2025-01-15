import { LogOut, MinusSquare, PlusSquare } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";
import { useDispatch } from "react-redux";
import { clearUserData } from "../../redux/features/userSlice";

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
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
            onClick={() => addtocart(foodId)}
        >
            <PlusSquare strokeWidth={2} size={24} className="text-gray-600" />
        </div>
    );
}

function DecreaseQuantityButton({ foodId, updateCartDetails }) {
    function removeFromCart(foodId) {
        console.log("foodId :>> ", foodId);
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
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
            onClick={() => removeFromCart(foodId)}
        >
            <MinusSquare strokeWidth={2} size={24} className="text-gray-600" />
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
        <div className="mt-3 text-center">
            <button onClick={logout} className="btn bg-gray-400">
                <LogOut />
                <span className="text-lg"> Logout </span>
            </button>
        </div>
    );
}

export { IncreaseQuantityButton, DecreaseQuantityButton, LogoutButton };
