import React from "react";
import { Typography, Box, Divider } from "@mui/material";
import moment from "moment";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const decryptMessage = (latestMessage) => {
    if (!latestMessage) {
        return "Start Chat";
    }
    const bytes = CryptoJS.AES.decrypt(
        latestMessage?.content,
        import.meta.env.VITE_ENCRYPTION_SECRET
    );

    const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
    if (decryptedMessage === "") {
        if (latestMessage?.fileContent?.length > 0) {
            return "File";
        }
        return "";
    }
    return decryptedMessage;
};

const MainPageSideBarConversations = ({ conversations }) => {
    const navigate = useNavigate();
    return (
        <div className="rounded-5xl grow customScroll shadow-c2 bg-white p-2.5 m-2.5 flex flex-col">
            {conversations?.length ? (
                conversations.map((conversation, index) => {
                    return (
                        <div key={index}>
                            <div
                                className="flex my-2.5 cursor-pointer"
                                onClick={() => {
                                    navigate(
                                        import.meta.env.VITE_APP +
                                            "/" +
                                            import.meta.env.VITE_CHAT.replace(
                                                ":chatId",
                                                conversation._id
                                            ),
                                        {
                                            state: {
                                                recieverData:
                                                    conversation.members[0],
                                            },
                                        }
                                    );
                                }}
                            >
                                <Box className="rounded-full px-2.5">
                                    {!conversation.members[0]?.picture?.url ? (
                                        <AccountCircle
                                            sx={{
                                                color: "#5d5656",
                                                height: "3rem",
                                                width: "3rem",
                                            }}
                                        />
                                    ) : (
                                        <img
                                            src={
                                                conversation.members[0]?.picture
                                                    ?.url
                                            }
                                            alt="dp"
                                            className="rounded-full h-12 w-12"
                                        />
                                    )}
                                </Box>
                                <Box className="grow mx-2">
                                    <Typography>
                                        {conversation.conversationName}
                                    </Typography>
                                    <Typography className="text-gray-600 italic">
                                        {decryptMessage(
                                            conversation?.latestMessage
                                        )}
                                    </Typography>
                                </Box>
                                <Box className="flex items-end">
                                    <Typography className="text-gray-400">
                                        {moment(
                                            conversation.updatedAt
                                        ).fromNow()}
                                    </Typography>
                                </Box>
                            </div>
                            <Divider key={index} />
                        </div>
                    );
                })
            ) : (
                <Typography>
                    No Chats
                    <br />
                    Start a new Conversation
                </Typography>
            )}
        </div>
    );
};

export default MainPageSideBarConversations;
