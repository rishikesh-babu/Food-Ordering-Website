import { useState } from "react"
import { saveUserData } from "../../redux/features/userSlice";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";
import { useDispatch } from "react-redux";

export function EditAddressModal() {
    const [address, setAddress] = useState()
    const dispatch = useDispatch()

    function handleAddress(event) {
        setAddress({
            ...address,
            [event.target.name]: event.target.value,
        });
    }

    function handleSubmit(event) {
        toast.promise(
            axiosInstance({
                method: 'PUT',
                url: '/user/update-profile',
                data: address,
            })
                .then((res) => {
                    dispatch(saveUserData(res?.data?.data))
                    toast.success(res?.data?.message)
                })
                .catch((err) => {
                    console.log('err :>> ', err);
                    toast.error(err?.response?.data?.message)
                }),
            {
                loading: 'Updating address please wait...'
            }
        )
    }

    return (
        <dialog id="editAddessModal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <div className="space-y-4">
                    {/* Title */}
                    <h3 className="font-bold text-2xl text-center">Edit Address</h3>

                    {/* Address Input Field */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-400 font-medium mb-1">Address:</label>
                        <input
                            onChange={handleAddress}
                            name="address"
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter new address"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                    >
                        Update Address
                    </button>
                </div>

            </div>
        </dialog>
    )
}

export function ProfileModal({ image }) {
    return (
        <dialog id="profile_modal" className="modal">
            <div className="modal-box p-0 size-fit">
                <img src={image} alt="Profile Pic" />
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}