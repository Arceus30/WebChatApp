import { createSlice } from "@reduxjs/toolkit";
import { loadState, saveState } from "../Helper/storage";

const initialState = () => {
    return (
        loadState("userState") || {
            token: null,
            userData: null,
        }
    );
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action?.payload?.accessToken;
            state.userData = action?.payload?.userData;
            saveState(state, "userState");
        },
        logout: (state) => {
            state.token = null;
            state.userData = null;
            saveState(state, "userState");
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
