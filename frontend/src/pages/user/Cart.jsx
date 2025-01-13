import React, { useEffect } from "react";
import axiosInstance from "../../config/axiosInstance";
import { CartCard } from "../../components/user/CardsUser";
import { useDispatch, useSelector } from "react-redux";
import { saveCartDetails } from "../../redux/features/cartSlice";

function Cart() {

    const { cartDetails } = useSelector((state) => state.cart)
    const dispatch = useDispatch()

    useEffect(() => {
        getCartDetails();
    }, []);

    function updateCartDetails(newCartDetails) {
        dispatch(saveCartDetails(newCartDetails))
    }

    function getCartDetails() {
        axiosInstance({
            method: "GET",
            url: "cart/get-cart-items",
        })
            .then((res) => {
                console.log("res :>> ", res);
                dispatch(saveCartDetails(res?.data?.data))
            })
            .catch((err) => {
                console.log("err :>> ", err);
            });
    }

    return (
        <div className="max-w-screen-lg mx-auto p-4">
            {/* Title Section */}
            <h1 className="text-3xl font-bold text-center mb-6">Food Cart</h1>
            
            {/* Cart Items List */}
            <div className="space-y-4">
                {cartDetails?.cartItems?.map((item, index) => (
                    <CartCard
                        name={item?.foodId?.name}
                        image={item?.foodId?.image}
                        price={item?.foodId?.price}
                        quantity={item.quantity}
                        foodId={item?.foodId?._id}
                        updateCartDetails={updateCartDetails}
                        key={index}
                    />
                ))}
            </div>
            
            {/* Total Price Section */}
            <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center">
                <span className="text-xl font-semibold">Total Price:</span>
                <span className="text-lg font-medium text-gray-800">${cartDetails?.totalPrice}</span>
            </div>
        </div>
    );
}


// function Cart() {
//     const [cartDetails, setCartDetails] = useState();

//     useEffect(() => {
//         getCartDetails();
//     }, []);

//     function updateCartDetails(newCartDetails) {
//         setCartDetails(newCartDetails)
//     }

//     function getCartDetails() {
//         axiosInstance({
//             method: "GET",
//             url: "cart/get-cart-items",
//         })
//             .then((res) => {
//                 console.log("res :>> ", res);
//                 setCartDetails(res?.data?.data);
//             })
//             .catch((err) => {
//                 console.log("err :>> ", err);
//             });
//     }
//     return (
//         <div>
//             <div> Food Cart </div>
//             <div>
//                 {cartDetails?.cartItems?.map((item, index) => (
//                     <CartCard
//                         name={item?.foodId?.name}
//                         image={item?.foodId?.image}
//                         price={item?.foodId?.price}
//                         quantity={item.quantity}
//                         foodId={item?.foodId?._id}
//                         updateCartDetails={updateCartDetails}
//                         key={index}
//                     />
//                 ))}
//             </div>
//             <div>
//                 {cartDetails?.totalPrice}
//             </div>
//         </div>
//     );
// }

export default Cart;
