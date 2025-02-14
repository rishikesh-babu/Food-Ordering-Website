import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isUserAuth: true,
    userData: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUserData: (state, action) => {
            state.isUserAuth = true 
            state.userData = action.payload
        },
        clearUserData: (state, action) => {
            state.isUserAuth = false
            state.userData = {}
        }
    }
})

export const {saveUserData, clearUserData } = userSlice.actions
const userReducer = userSlice.reducer
export default userReducer