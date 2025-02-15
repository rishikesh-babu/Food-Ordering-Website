import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    hotelDetails: []
}

const hotelSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {
        saveHotelDetails: (state, action) => {
            state.hotelDetails = action.payload
        },
        clearHotelDetails: (state, action) => {
            state.hotelDetails = []
        }
    }
})

export const {saveHotelDetails, clearHotelDetails } = hotelSlice.actions
const hotelReducer = hotelSlice.reducer
export default hotelReducer