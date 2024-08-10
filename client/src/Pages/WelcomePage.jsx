import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import logo from "../assets/live-chat_512px.png";
import { Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const WelcomePage = () => {
    const { userData } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();

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

    return (
        <div className="h-full w-full sm:w-[55%] md:w-3/5 lg:w-[70%] flex flex-col justify-center items-center gap-5 border-b-[6px] border-[#63d7b0] rounded-5xl sm:rounded-s-none">
            <motion.img
                drag
                whileTap={{
                    scale: 1.05,
                    rotate: 360,
                    transition: { duration: 0.6 },
                }}
                src={logo}
                alt="Logo"
                className="h-60 w-60 md:h-96 md:w-96 select-none"
            />
            <div className="p-0.5">
                <Typography className="text-center">
                    Hi, {userData?.name} 👋
                </Typography>
                <Typography className="text-center">
                    View and text directly to people present in the chat Rooms.
                </Typography>
            </div>
        </div>
    );
};

export default WelcomePage;
