import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    sideBarToggle: true,
}

const sideBarSlice = createSlice({
    name: 'sideBar',
    initialState,
    reducers: {
        toggleSideBar: (state, action) => {
            state.sideBarToggle = !state.sideBarToggle 
        },
    }
})

export const { toggleSideBar } = sideBarSlice.actions
const sideBarReducer = sideBarSlice.reducer
export default sideBarReducer