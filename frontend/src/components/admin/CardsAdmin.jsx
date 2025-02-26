import { useNavigate } from "react-router-dom"
import { FoodRemoveButton, HotelRemoveButton } from "./ButtonAdmin"
import { Eye } from "lucide-react"

function HotelCard({ name, image, hotelId }) {

    const navigate = useNavigate()

    function goToSingleHotel() {
        navigate(`/admin/hotel/${hotelId}`)
    }

    return (
        <div
            className="my-5 p-4  hover:bg-gray-300 dark:hover:bg-gray-600 hover:shadow-md transition-all duration-200 border rounded-lg shadow-md flex items-center justify-between sm:gap-8"
        >
            <div className="h-20 w-20">
                <img
                    className="h-full w-full rounded-xl object-cover"
                    src={image}
                    alt="hotel image"
                />
            </div>
            <div className="sm:text-lg md:text-xl text-balance text-center sm:flex-grow sm:text-left font-semibold">
                {name}
            </div>
            <div className="flex items-center justify-between gap-1 sm:gap-6">
                <div>
                    <button onClick={goToSingleHotel} className="btn btn-primary">
                        <Eye />
                    </button>
                </div>
                <div>
                    <HotelRemoveButton hotelId={hotelId} />
                </div>
            </div>

        </div>
    )
}

function FoodCard({ name, image, price, foodId }) {
    return (
        <div className="w-full rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
                <tbody>
                    <tr className="border-b border-gray-400">
                        <td className="p-4 w-1/4">
                            <img src={image} alt="food item" className="w-20 h-20 object-fill rounded-md" />
                        </td>
                        <td className="p-4 text-left w-1/2">
                            <div className="font-semibold text-xl">{name}</div>
                            <div className="text-green-500 dark:text-green-400 text-xl">${price}</div>
                        </td>
                        <td className="p-4 text-right w-1/4">
                            <FoodRemoveButton foodId={foodId} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}


function ViewOrderCard({ name, image, address, price }) {
    return (
        <div className="grid grid-cols-3 items-center sm:flex gap-4 p-4 border border-gray-200 rounded-lg shadow-md dark:bg-gray-800">
            {/* Image */}
            <div className="w-20 h-20 overflow-hidden rounded-md">
                <img className="w-full h-full object-cover" src={image} alt={name} />
            </div>

            {/* Order Details */}
            <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-semibold ">{name}</h3>
                <p className="text-sm text-gray-500">{address}</p>
            </div>

            {/* Price */}
            <div className="text-lg font-bold text-green-600 md:mr-10">${price}</div>
        </div>

    )
}

export { HotelCard, FoodCard, ViewOrderCard }