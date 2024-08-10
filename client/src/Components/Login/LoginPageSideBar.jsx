import React from "react";
import logo from "../../assets/live-chat_512px.png";

const LoginPageSideBar = () => {
    return (
        <div className="sm:w-1/3 flex items-center justify-center pt-1.5 sm:px-2.5">
            <img src={logo} alt="Logo" className="h-[20vw]" />
        </div>
    );
};

export default LoginPageSideBar;
