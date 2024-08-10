import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    refreshSideBar: true,
};

const refreshSlice = createSlice({
    name: "refresh",
    initialState,
    reducers: {
        toggleRefresh: (state) => {
            state.refreshSideBar = !state.refreshSideBar;
        },
    },
});

export const { toggleRefresh } = refreshSlice.actions;

export default refreshSlice.reducer;
