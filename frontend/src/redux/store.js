import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./features/adminSilce";
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";
import wishlistReducer from "./features/wishlistSlice";
import sideBarReducer from "./features/sideBarSlice";
import orderReducer from "./features/orderSlice";
import hotelReducer from "./features/hotelSlice";
import foodReducer from "./features/foodSlice";
import darkModeReducer from "./features/darkModeSlice";

const store = configureStore({
    reducer: {
        admin: adminReducer,
        user: userReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        sideBar: sideBarReducer,
        order: orderReducer,
        hotel: hotelReducer,
        food: foodReducer,
        darkMode: darkModeReducer,        
    }
})

export default store