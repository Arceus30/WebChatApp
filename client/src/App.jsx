import React from "react";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import routes from "./Routes";
import AccountProvider from "./Context/AccountContext";

const App = () => {
    const { Light } = useSelector((state) => state.theme);
    return (
        <AccountProvider>
            <div
                className={`${
                    Light ? "bg-lightApp" : "bg-darkApp"
                } min-h-screen flex justify-center items-center`}
            >
                <RouterProvider router={routes} />
            </div>
        </AccountProvider>
    );
};

export default App;
