import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishlistData: {},
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        savewishlistData: (state, action) => {
            state.wishlistData = action.payload
            console.log('state.wishlistData :>> ', state.wishlistData);
        },
        clearwishlistData: (state, action) => {
            state.wishlistData = {}
        }
    }
})

export const { savewishlistData, clearwishlistData } = wishlistSlice.actions
const wishlistReducer = wishlistSlice.reducer
export default wishlistReducer