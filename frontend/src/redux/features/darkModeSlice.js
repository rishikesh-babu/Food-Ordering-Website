import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    darkMode: false
}

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers: {
        changeDarkMode: (state, action) => {
            state.darkMode = !state.darkMode
        }
    }
})

export const { changeDarkMode } = darkModeSlice.actions
const darkModeReducer = darkModeSlice.reducer
export default darkModeReducer