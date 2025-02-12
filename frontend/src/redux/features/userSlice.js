import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isUserAuth: false,
    userData: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        saveUserData: (state, action) => {
            state.isUserAuth = true 
            state.userData = action.payload
            console.log('action.payload :>> ', action.payload);
            console.log('state.userData :>> ', state.userData);
            console.log('state.isUserAuth :>> ', state.isUserAuth);
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