import React, { useContext } from "react";
import { IconButton, Box } from "@mui/material";
import { MoreVert, AccountCircle } from "@mui/icons-material";
import { AccountContext } from "../../Context/AccountContext.jsx";

const ChatAreaHeader = ({ recieverData }) => {
    const { activeUsers } = useContext(AccountContext);
    const status = () => {
        const isActive = activeUsers.find(
            (user) => user._id === recieverData._id
        );
        return isActive ? "Online" : "Offline";
    };
    return (
        <div className="w-full flex rounded-5xl items-center gap-2.5 bg-white shadow-c2 p-2.5">
            <IconButton
                onClick={() => {
                    navigate(import.meta.env.VITE_APP);
                }}
                sx={{ paddingX: "10px", paddingY: "0", borderRadius: "50%" }}
            >
                {!recieverData?.picture?.url ? (
                    <AccountCircle
                        sx={{
                            color: "#5d5656",
                            height: "2rem",
                            width: "2rem",
                        }}
                    />
                ) : (
                    <img
                        src={recieverData.picture.url}
                        alt="dp"
                        className="rounded-full h-8 w-8"
                    />
                )}
            </IconButton>
            <Box className="grow">
                <h1 className="font-semibold text-xl">{recieverData?.name}</h1>
                <p className="text-gray-400 font-semibold italic">{status()}</p>
            </Box>
            <IconButton>
                <MoreVert />
            </IconButton>
        </div>
    );
};

export default ChatAreaHeader;
