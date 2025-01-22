import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./features/adminSilce";
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";
import wishlistReducer from "./features/wishlistSlice";

const store = configureStore({
    reducer: {
        admin: adminReducer,
        user: userReducer,
        cart: cartReducer,
        wishlist: wishlistReducer
    }
})

export default store