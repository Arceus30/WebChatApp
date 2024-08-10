import React, { useContext } from "react";
import { IconButton } from "@mui/material";
import {
    AccountCircle,
    AddCircle,
    ExitToApp,
    GroupAdd,
    LightMode,
    Nightlight,
    PersonAdd,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../Store/themeSlice";
import { logout } from "../../Store/userSlice";
import { AccountContext } from "../../Context/AccountContext";

const MainPageSideBarHeader = ({ userPicture }) => {
    const navigate = useNavigate();
    const { Light } = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    const { socket } = useContext(AccountContext);

    const handleLogout = () => {
        try {
            localStorage.removeItem("userState");
            dispatch(logout());
            toast.success("logout Successfull");
            navigate(import.meta.env.VITE_HOME);
            socket?.current?.emit("userDisconnect");
        } catch (e) {
            console.error(e);
            toast.error("logout failed");
        }
    };
    return (
        <div className="rounded-5xl shadow-c2 bg-white p-0.5 m-2.5 flex justify-between">
            <div className="grow flex justify-evenly">
                <IconButton
                    onClick={() => {
                        navigate(import.meta.env.VITE_APP);
                    }}
                    className="rounded-full px-2.5"
                >
                    {!userPicture ? (
                        <AccountCircle
                            sx={{
                                color: "#5d5656",
                                height: "2rem",
                                width: "2rem",
                            }}
                        />
                    ) : (
                        <img
                            src={userPicture}
                            alt="dp"
                            className="rounded-full h-8 w-8"
                        />
                    )}
                </IconButton>
                <IconButton
                    onClick={() => {
                        navigate(
                            import.meta.env.VITE_APP +
                                "/" +
                                import.meta.env.VITE_ADD_USER
                        );
                    }}
                >
                    <PersonAdd className="icon" />
                </IconButton>
                <IconButton
                // onClick={() => {
                //     navigate(
                //         import.meta.env.VITE_APP +
                //             "/" +
                //             import.meta.env.VITE_ADD_GROUP
                //     );
                // }}
                >
                    <GroupAdd className="icon" />
                </IconButton>
                <IconButton
                // onClick={() => {
                //     navigate(
                //         import.meta.env.VITE_APP +
                //             "/" +
                //             import.meta.env.VITE_CREATE_GROUP
                //     );
                // }}
                >
                    <AddCircle className="icon" />
                </IconButton>
                <IconButton
                    onClick={() => {
                        dispatch(toggleTheme());
                    }}
                >
                    {Light ? (
                        <Nightlight className="icon" />
                    ) : (
                        <LightMode className="icon" />
                    )}
                </IconButton>
                <IconButton onClick={handleLogout}>
                    <ExitToApp className="icon" />
                </IconButton>
            </div>
        </div>
    );
};

export default MainPageSideBarHeader;
