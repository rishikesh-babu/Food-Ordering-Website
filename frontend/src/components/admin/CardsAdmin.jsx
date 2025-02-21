import { useNavigate } from "react-router-dom"
import { FoodRemoveButton, HotelRemoveButton } from "./ButtonAdmin"

function HotelCard({ name, image, hotelId }) {

    const navigate = useNavigate()

    function gotToSingleHotel() {
        navigate(`/admin/hotel/${hotelId}`)
    }

    return (
        <div
            className="my-5 p-4 bg-gray-100 hover:bg-gray-300 hover:shadow-md transition-all duration-200 border rounded-lg shadow-md flex items-center justify-between sm:gap-8"
        >
            <div className="h-20 w-20">
                <img
                    onClick={() => gotToSingleHotel()}
                    className="h-full w-full rounded-xl object-cover cursor-pointer hover:scale-105"
                    src={image}
                    alt="hotel image"
                />
            </div>
            <div className="text-medium text-balance text-center sm:flex-grow sm:text-left sm:text-2xl md:text-3xl font-semibold text-gray-800">
                {name}
            </div>
            <div className="flex justify-center md:justify-end">
                <HotelRemoveButton hotelId={hotelId} />
            </div>
        </div>
    )
}

function FoodCard({ name, image, price, foodId }) {
    return (
        <div className="p-3 sm:p-6 bg-gradient-to-r from-blue-100 to-blue-50 border rounded-lg shadow-xl grid grid-cols-2 items-center gap-6">
            <div className="flex-shrink-0">
                <img
                    className="size-28 md:h-32 md:w-32 rounded-xl object-cover border-2 border-blue-500 shadow-md hover:cursor-pointer hover:scale-105"
                    src={image}
                    alt="food item"
                />
            </div>
            <div>
                <div className="mb-2">
                    <div className="text-gray-800 text-lg font-semibold ">{name}</div>
                    <div className="text-green-600 mt-1">${price}</div>
                </div>
                <div>
                    <FoodRemoveButton foodId={foodId} />
                </div>
            </div>
        </div>
    )
}

function ViewOrderCard({ name, image, address, price }) {
    return (
        <div className="grid grid-cols-3 items-center sm:flex gap-4 p-4 border border-gray-200 rounded-lg shadow-md bg-white">
            {/* Image */}
            <div className="w-20 h-20 overflow-hidden rounded-md">
                <img className="w-full h-full object-cover" src={image} alt={name} />
            </div>

            {/* Order Details */}
            <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                <p className="text-sm text-gray-500">{address}</p>
            </div>

            {/* Price */}
            <div className="text-lg font-bold text-green-600 md:mr-10">${price}</div>
        </div>

    )
}

export { HotelCard, FoodCard, ViewOrderCard }