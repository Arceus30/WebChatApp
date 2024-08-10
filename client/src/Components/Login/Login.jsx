import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { Backdrop, CircularProgress } from "@mui/material";

const Login = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [loading, setLoading] = useState(false);

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
            <div className="h-full sm:h-auto sm:w-full bg-white rounded-5xl m-2.5 p-2.5 text-[#63d7b0] font-semibold flex flex-col justify-center items-center gap-5">
                {showLogin ? (
                    <LoginForm
                        setLoading={setLoading}
                        setShowLogin={setShowLogin}
                    />
                ) : (
                    <SignUpForm
                        setLoading={setLoading}
                        setShowLogin={setShowLogin}
                    />
                )}
            </div>
        </>
    );
};

export default Login;
