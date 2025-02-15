import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    foodDetails: []
}

const foodSlice = createSlice({
    name: 'food',
    initialState,
    reducers: {
        saveFoodDetails: (state, action) => {
            state.foodDetails = action.payload
        },
        clearFoodDetails: (state, action) => {
            state.foodDetails = []
        }
    }
})

export const {saveFoodDetails, clearFoodDetails } = foodSlice.actions
const foodReducer = foodSlice.reducer
export default foodReducer