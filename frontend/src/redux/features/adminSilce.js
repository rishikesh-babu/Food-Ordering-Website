import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAdminAuth: false,
    adminData: {},
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        saveAdminData: (state, action) => {
            state.isAdminAuth = true 
            state.adminData = action.payload
            console.log('action.payload :>> ', action.payload);
            console.log('state.adminData :>> ', state.adminData);
            console.log('state.isAdminAuth :>> ', state.isAdminAuth);
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