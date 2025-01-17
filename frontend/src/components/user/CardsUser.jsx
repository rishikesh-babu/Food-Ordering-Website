import { useDispatch, useSelector } from "react-redux";
import { DecreaseQuantityButton, IncreaseQuantityButton } from "./ButtonUser"
import { saveCartDetails } from "../../redux/features/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

function UserHotelCard({ name, image, address, hotelId }) {

    const navigate = useNavigate()

    return (
        <div onClick={() => navigate(`/hotel/${hotelId}`)} className="p-6 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6 transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="flex-shrink-0">
                <img
                    src={image}
                    alt="Image"
                    className="h-24 w-24 md:h-32 md:w-32 rounded-xl object-cover border-2 border-blue-500 shadow-md"
                />
            </div>
            <div className="text-center md:text-left">
                <div className="text-xl font-bold text-blue-800">
                    {name ?? 'Name'}
                </div>
                <div className="text-lg font-medium text-gray-700 mt-2">
                    {address ?? 'address'}
                </div>
            </div>
        </div>
    )
}

function UserFoodCard({ name, image, price, foodId, addToCart }) {

    const { cartDetails } = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const foodIndex = cartDetails?.cartItems?.findIndex((item) => item?.foodId?._id === foodId)

    function updateCartDetails(newCartDetails) {
        dispatch(saveCartDetails(newCartDetails))
    }

    return (
        <div className="p-6 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
                <Link to={`/food/${foodId}`}>
                    <img
                        src={image}
                        alt="Image"
                        className="h-24 w-24 md:h-32 md:w-32 rounded-xl object-cover border-2 border-blue-500 shadow-md hover:cursor-pointer hover:scale-105"
                    />
                </Link>
            </div>
            <div className="text-center md:text-left">
                <div className="text-xl font-bold text-blue-800">
                    {name ?? 'Name'}
                </div>
                <div className="flex flex-row items-center justify-around my-3">
                    <span className="text-lg font-medium text-gray-700">
                        ${price ?? 'price'}
                    </span>
                    <div>
                        {/* <Heart fill="red"/> */}
                        {/* <Heart /> */}
                    </div>
                </div>
                <div className="text-lg font-semibold">
                    <button
                        className="btn bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-md transition-all duration-200 ease-in-out transform hover:scale-105"
                        onClick={() => addToCart(foodId)}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}

function CartCard({ name, price, quantity, image, foodId, updateCartDetails }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 mb-4 border border-gray-300 rounded-lg shadow-md bg-white w-full max-w-4xl mx-auto">
            <div className="flex justify-center sm:justify-start">
                <img src={image} alt="image" className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg" />
            </div>

            <div className="flex flex-col justify-center items-center sm:ml-4">
                <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                <p className="text-lg font-medium text-gray-600">{price}</p>
            </div>

            <div className="flex flex-row justify-center items-center gap-3">
                <div className="flex items-center">
                    <DecreaseQuantityButton foodId={foodId} updateCartDetails={updateCartDetails} />
                </div>
                <div className="text-lg font-medium"> {quantity}</div>
                <div className="flex items-center">
                    <IncreaseQuantityButton foodId={foodId} updateCartDetails={updateCartDetails} />
                </div>
            </div>
        </div>
    );
}

export { UserHotelCard, UserFoodCard, CartCard }