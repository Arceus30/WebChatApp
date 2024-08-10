import React, { useEffect } from "react";
import LoginPageSideBar from "../Components/Login/LoginPageSideBar";
import Login from "../Components/Login/Login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
    const { userData } = useSelector((state) => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (userData && Object.keys(userData).length > 0) {
            navigate(import.meta.env.VITE_APP);
            toast.info("You are logged In");
        }
    }, []);
    return (
        <div className="h-90 w-90 bg-light rounded-5xl flex shadow-c1 flex-col sm:flex-row">
            <LoginPageSideBar />
            <Login />
        </div>
    );
};

export default LoginPage;
