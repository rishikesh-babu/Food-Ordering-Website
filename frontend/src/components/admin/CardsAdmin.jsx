import { useNavigate } from "react-router-dom"
import { HotelRemoveButton } from "./ButtonAdmin"
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useState } from "react"
import axiosInstance from "../../config/axiosInstance"
import toast from "react-hot-toast"
import { DeleteForeverRounded, Edit } from "@mui/icons-material"

function HotelCard({ name, image, hotelId, address, hotel, openUpdateHotelModal }) {
    return (
        <div className="py-2 flex justify-between items-center gap-2 border-b-2 border-gray-400 flex-nowrap">
            <div className="h-20 w-20 flex-shrink-0">
                <img
                    className="h-full w-full rounded-xl object-cover"
                    src={image}
                    alt="hotel image"
                />
            </div>
            <div className="text-sm font-semibold font-mono text-left flex-grow sm:text-lg sm:text-left md:text-xl">
                {name}
            </div>
            <div className="flex-shrink-0 flex items-center justify-between gap-4 sm:gap-6">
                <button onClick={() => openUpdateHotelModal(hotel)} className="hover:scale-110">
                    {/* <Eye /> */}
                    <Edit className="text-blue-500" />
                </button>
                <HotelRemoveButton hotelId={hotelId} />
            </div>
        </div>
    )
}

function FoodCard({ name, image, price, foodId, food, openUpdateFoodModal }) {

    function deleteFood() {
        toast.promise(
            axiosInstance({
                method: 'DELETE', 

            })
        )
    }

    return (
        <div className="border-b-2 border-gray-400 py-2 flex flex-row justify-between items-center gap-3">
            {/* <table className="w-full border-collapse">
                <tbody>
                    <tr className="border-b border-gray-400">
                        <td className="p-4 w-1/4">
                            <img src={image} alt="food item" className="w-20 h-20 object-fill rounded-md" />
                        </td>
                        <td className="p-4 text-left w-1/2">
                            <div className="font-semibold text-xl">{name}</div>
                            <div className="text-green-500 dark:text-green-400 text-xl">₹{price}</div>
                        </td>
                        <td className="p-4 text-right w-1/4">
                            <FoodRemoveButton foodId={foodId} />
                        </td>
                    </tr>
                </tbody>
            </table> */}
            <div className="h-20 w-20 flex-shrink-0">
                <img
                    className="h-full w-full rounded-xl object-cover"
                    src={image}
                    alt="hotel image"
                />
            </div>
            <div className="flex-grow flex flex-col ">
                <div className=" text-[1.2em] font-mono font-[600]">
                    {name}
                </div>
                <div className="text-[1.2em] text-green-500 dark:text-green-400">
                    ₹ {price}
                </div>
            </div>
            <div className="flex gap-4">
                <button className="text-blue-500" onClick={() => openUpdateFoodModal(food)}>
                    <Edit />
                </button>
                <DeleteForeverRounded className="text-red-600" />
            </div>
        </div>
    );
}

function ViewOrderCard({ name, image, totalPrice, foodItems, address, orderStatus, orderId }) {
    const [status, setStatus] = useState(orderStatus);
    const [tempOrderStatus, setTemepOrderStatus] = useState(orderStatus)

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;
        setStatus(newStatus);
    };

    function handleStatus() {
        let url
        if (status === 'complete') {
            url = '/order/complete-order'
        } else if (status === 'cancel') {
            url = '/order/cancel-order'
        } else {
            toast.error('Select status', {
                duration: Infinity
            })
            setTimeout(() => {
                toast.dismiss()
            }, 1500);
            return
        }

        toast.promise(
            axiosInstance({
                method: 'PUT',
                url: url,
                data: { orderId },
            })
                .then((res) => {
                    console.log('res :>> ', res);
                    orderStatus = res?.data?.data?.orderStatus
                    setTemepOrderStatus(orderStatus)
                    console.log('orderStatus :>> ', orderStatus);
                    toast.success(res?.data?.message)
                })
                .catch((err) => {
                    console.log('err :>> ', err);
                    toast.error(err?.response?.data?.message || 'Error happen')
                }),
            {
                loading: 'Changing status'
            }
        )
    }

    return (
        <div className="p-4 mb-4 max-w-3xl mx-auto shadow-lg rounded-2xl bg-gray-100 dark:bg-gray-700">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">{name}</h2>
                    <p className="text-lg font-bold">₹{totalPrice}</p>
                </div>
                <img src={image} alt={name} className="size-40 object-cover rounded-lg" />
                <p className="text-sm text-gray-600 dark:text-gray-400">{address}</p>
                <div>
                    <h3 className="font-semibold mb-2">Food Items:</h3>
                    <ul className="list-disc ml-4 text-sm">
                        {foodItems.map((item, index) => (
                            <li key={index}>
                                {item.foodId.name} x {item.quantity} - ₹{item.price}
                            </li>
                        ))}
                    </ul>
                    <h3 className={`font-semibold mb-2 ${tempOrderStatus === 'pending' && 'text-yellow-500'} ${tempOrderStatus === 'complete' && 'text-green-500'} ${tempOrderStatus === 'cancel' && 'text-red-500'} `}>
                        Status: {tempOrderStatus}
                    </h3>
                </div>
                <div className={`flex justify-between items-center ${(tempOrderStatus === 'complete' || tempOrderStatus === 'cancel') && 'hidden'}`}>
                    <FormControl className="w-1/2">
                        <InputLabel>Status</InputLabel>
                        <Select value={status} onChange={handleStatusChange} className="dark:border-2 dark:border-gray-500">
                            {/* <MenuItem value="pending">Pending</MenuItem> */}
                            <MenuItem value="complete">Complete</MenuItem>
                            <MenuItem value="cancel">Cancel</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={() => handleStatus()}>Update Status</Button>
                </div>
            </div>
        </div>
    );
}

export { HotelCard, FoodCard, ViewOrderCard }