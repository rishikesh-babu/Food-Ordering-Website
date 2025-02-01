import { useNavigate } from "react-router-dom";

function HotelRemoveButton() {
    return <button className="btn btn-error">Delete</button>;
}

function CreateHotelButton({ handleSubmit }) {
    return (
        <div>
            <button onClick={handleSubmit} className="btn btn-active btn-ghost">
                Create Hotel
            </button>
        </div>
    );
}

function CreateFoodButton({ handleSubmit }) {
    return (
        <div className="flex justify-center mt-6">
            <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
            >
                Create Food
            </button>
        </div>
    );
}

function FoodRemoveButton() {
    return <button className="btn btn-error">Remove</button>;
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
