import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartLength: 0,
    cartDetails: {}
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        saveCartDetails: (state, action) => {
            state.cartDetails = action.payload
            // console.log('state.cartDetails :>> ', state.cartDetails);
            state.cartLength = state.cartDetails?.cartItems?.length
        },
        clearCartDetails: (state, action) => {
            state.cartLength = 0
            state.cartDetails = {}
        }
    }
})

export const {saveCartDetails, clearCartDetails } = cartSlice.actions
const cartReducer = cartSlice.reducer
export default cartReducer