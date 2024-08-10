import React from "react";

import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSelector } from "react-redux";

const Toaster = () => {
    const { Light } = useSelector((state) => state.theme);
    return (
        <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={`${Light ? "light" : "dark"}`}
            transition={Zoom}
        />
    );
};

export default Toaster;
