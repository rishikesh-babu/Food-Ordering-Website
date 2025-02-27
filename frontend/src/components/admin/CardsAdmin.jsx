import { useNavigate } from "react-router-dom"
import { FoodRemoveButton, HotelRemoveButton } from "./ButtonAdmin"
import { Eye } from "lucide-react"
import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useState } from "react"
import axiosInstance from "../../config/axiosInstance"
import toast from "react-hot-toast"

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
                            <div className="text-green-500 dark:text-green-400 text-xl">₹{price}</div>
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