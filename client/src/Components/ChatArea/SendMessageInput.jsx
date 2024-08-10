import React, { useState, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IconButton, Box, Menu, MenuItem, Typography } from "@mui/material";
import { onError } from "../../Helper/onError";
import { useAPI } from "../../Helper/api/api.jsx";
import { AttachFile, Delete, Close } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import CryptoJS from "crypto-js";
import { AccountContext } from "../../Context/AccountContext.jsx";

const secretKey = import.meta.env.VITE_ENCRYPTION_SECRET;

const encryptMessage = (message) => {
    const encryptedMessage = CryptoJS.AES.encrypt(
        message?.message?.text,
        secretKey
    ).toString();
    return encryptedMessage;
};

const DropzoneWrapper = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: "100%",
});

const MenuCloseButton = styled(IconButton)({
    position: "absolute",
    top: -15,
    right: 0,
});

const MenuItemWrapper = styled(MenuItem)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    paddingRight: "40px",
    backgroundColor: "transparent",
    "&:hover": {
        backgroundColor: "transparent",
    },
}));

const SendMessageInput = ({ recieverDataId, senderId, setLoading }) => {
    const { token } = useSelector((state) => state.user);

    const form = useForm({ mode: "onBlur" });
    const { register, handleSubmit, reset } = form;

    const [files, setFiles] = useState(null);

    const { sendMessageAPI } = useAPI();

    const { chatId } = useParams();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const { socket } = useContext(AccountContext);

    const handleClose = () => {
        setAnchorEl(null);
        handleReset();
    };

    const handleReset = () => {
        setFiles(null);
        reset();
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setFiles(acceptedFiles);
            setAnchorEl(document.getElementById("upload-menu-button"));
        },
        onDropRejected: (rejectedFiles) => {
            setFiles(null);
        },
        multiple: true,
    });

    const onSubmit = async (data) => {
        try {
            if (!files || !files.length) {
                const message = {
                    senderId,
                    recieverDataId,
                    content: data.message.text,
                    fileContent: files,
                    conversationId: chatId,
                };
                socket?.current?.emit("sendMessage", message);
            }
            data.message.text = encryptMessage(data);
            await sendMessageAPI(
                token,
                recieverDataId,
                chatId,
                data,
                files,
                setLoading
            );
            handleClose();
        } catch (e) {
            console.error(e);
        }
        reset();
    };

    return (
        <div className="bg-white shadow-c2 flex rounded-xl w-full px-3.5 justify-center">
            <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="w-full mx-2.5 flex gap-5"
            >
                <DropzoneWrapper {...getRootProps()}>
                    <VisuallyHiddenInput
                        type="file"
                        aria-label="Upload File"
                        {...getInputProps()}
                    />

                    <IconButton id="upload-menu-button">
                        <AttachFile sx={{ transform: "rotate(45deg)" }} />
                    </IconButton>
                </DropzoneWrapper>

                <input
                    type="text"
                    placeholder="Type your message"
                    className="outline-none border-none text-lg w-full"
                    {...register("message.text")}
                    autoFocus
                />
                <IconButton onClick={handleReset}>
                    <Delete />
                </IconButton>
            </form>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                PaperProps={{
                    style: {
                        marginLeft: "25px",
                        marginTop: "10px",
                    },
                }}
            >
                <MenuItemWrapper>
                    <MenuCloseButton onClick={handleClose}>
                        <Close />
                    </MenuCloseButton>
                </MenuItemWrapper>
                <MenuItemWrapper>
                    <Typography variant="body2">
                        {files && files?.length && files[0]?.name}
                    </Typography>
                </MenuItemWrapper>
                <MenuItemWrapper>
                    <Typography variant="body2">
                        Total Files: {files?.length}
                    </Typography>
                </MenuItemWrapper>
                <MenuItemWrapper>
                    <input
                        type="text"
                        placeholder="Type your message"
                        className="outline-none border-none text-sm w-full"
                        {...register("message.text")}
                        autoFocus
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleSubmit(onSubmit, onError)();
                                handleClose();
                            }
                        }}
                    />
                </MenuItemWrapper>
            </Menu>
        </div>
    );
};

export default SendMessageInput;
