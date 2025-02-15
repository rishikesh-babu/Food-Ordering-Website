import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAdminAuth: true,
    adminData: {},
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        saveAdminData: (state, action) => {
            state.isAdminAuth = true 
            state.adminData = action.payload
        },
        clearAdminData: (state, action) => {
            state.isAdminAuth = false
            state.adminData = {}
        }
    }
})

export const {saveAdminData, clearAdminData } = adminSlice.actions
const adminReducer = adminSlice.reducer
export default adminReducer