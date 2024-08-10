import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import refreshReducer from "./refreshSlice";
import userReducer from "./userSlice";

const store = configureStore({
    reducer: {
        theme: themeReducer,
        refresh: refreshReducer,
        user: userReducer,
    },
});

export default store;
