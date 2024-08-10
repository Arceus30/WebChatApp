import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    Light: true,
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.Light = !state.Light;
        },
    },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
