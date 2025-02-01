import { useNavigate } from "react-router-dom"
import { FoodRemoveButton, HotelRemoveButton } from "./ButtonAdmin"

function HotelCard({ name, image, hotelId }) {

    const navigate = useNavigate()

    function gotToSingleHotel() {
        navigate(`/admin/hotel/${hotelId}`)
    }

    return (
        <div
            onClick={gotToSingleHotel}
            className="hover:bg-gray-100 transition-all duration-200 cursor-pointer m-5 p-4 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 justify-items-center items-center gap-6"
        >
            <div className="flex justify-center">
                <img
                    className="h-32 w-32 rounded-xl object-cover"
                    src={image}
                    alt="hotel image"
                />
            </div>
            <div className="text-2xl md:text-3xl text-center font-semibold text-gray-800">
                {name}
            </div>
            <div className="flex justify-center md:justify-end">
                <HotelRemoveButton />
            </div>
        </div>
    )
}

function FoodCard({ name, image, price }) {
    return (

        <div className="p-3 sm:p-6 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg shadow-xl grid grid-cols-2 items-center gap-6">
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
                    <FoodRemoveButton />
                </div>
            </div>
        </div>


        // <div className="hover:bg-gray-100 transition-all duration-200 cursor-pointer m-5 p-4 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 items-center gap-6">
        //     <div className="flex justify-center">
        //         <img
        //             className="h-24 w-24 rounded-xl object-cover"
        //             src={image}
        //             alt="food item"
        //         />
        //     </div>
        //     <div className="flex flex-col text-center md:text-left text-lg font-medium">
        //         <div className="text-gray-800">{name}</div>
        //         <div className="text-green-600 mt-1">${price}</div>
        //     </div>
        //     <div className="flex justify-center md:justify-end">
        //         <FoodRemoveButton />
        //     </div>
        // </div>
    )
}

export { HotelCard, FoodCard }