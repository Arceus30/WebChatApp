import React, { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Backdrop, CircularProgress } from "@mui/material";
import MainPageSideBar from "../Components/Main/MainPageSideBar.jsx";
import { AccountContext } from "../Context/AccountContext.jsx";

const MainPage = () => {
    const { userData, token } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const { socket, setActiveUsers } = useContext(AccountContext);

    useEffect(() => {
        if (!userData || !Object.keys(userData).length) {
            navigate(import.meta.env.VITE_HOME, {
                state: {
                    prevUrl: location.pathname,
                },
            });
            toast.error("You need to login first");
        }
    }, [userData]);

    useEffect(() => {
        socket?.current?.emit("addUser", userData);
        socket?.current?.on("getUsers", (users) => {
            setActiveUsers(users);
        });
    }, [userData, socket.current]);

    return (
        <>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={loading}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
            <div className="h-90 w-90 bg-light rounded-5xl flex shadow-c1 flex-col sm:flex-row">
                <MainPageSideBar setLoading={setLoading} />
                <Outlet context={{ token, userData, setLoading }} />
            </div>
        </>
    );
};

export default MainPage;
