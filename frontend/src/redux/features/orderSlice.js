import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    orderDetails: {}
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        saveOrderDetails: (state, action) => {
            state.orderDetails = action.payload
        },
        clearCartDetails: (state, action) => {
            state.cartLength = 0
            state.orderDetails = {}
        }
    }
})

export const {saveOrderDetails, clearCartDetails } = orderSlice.actions
const orderReducer = orderSlice.reducer
export default orderReducer