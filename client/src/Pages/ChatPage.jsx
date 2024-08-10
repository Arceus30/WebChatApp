import React, { useContext, useEffect, useState } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
    useOutletContext,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";
import ChatAreaHeader from "../Components/ChatArea/ChatAreaHeader.jsx";
import MessagesContainer from "../Components/ChatArea/MessagesContainer.jsx";
import SendMessageInput from "../Components/ChatArea/SendMessageInput.jsx";
import { useAPI } from "../Helper/api/api.jsx";
import { AccountContext } from "../Context/AccountContext.jsx";

const ChatPage = () => {
    const navigate = useNavigate();
    const { setLoading } = useOutletContext();
    const location = useLocation();
    const [loaded, setLoaded] = useState(false);
    const { userData } = useOutletContext();
    const { chatId } = useParams();
    const { fetchMessagesAPI } = useAPI();
    const { refreshSideBar } = useSelector((state) => state.refresh);
    const { token } = useSelector((state) => state.user);
    const [allMessages, setAllMessages] = useState([]);
    const { socket } = useContext(AccountContext);
    const [incomingMessage, setIncomingMessage] = useState(null);
    useEffect(() => {
        if (!userData || !Object.keys(userData).length) {
            navigate(import.meta.env.VITE_HOME, {
                state: {
                    prevUrl: location.pathname,
                },
            });
            toast.error("You need to login first");
        }
    }, []);

    useEffect(() => {
        socket?.current?.on("getMessage", (data) => {
            setIncomingMessage({
                ...data,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        const fetchAllMessages = async () => {
            try {
                await fetchMessagesAPI(
                    token,
                    chatId,
                    setAllMessages,
                    setLoaded
                );
            } catch (e) {
                console.error(e);
                navigate(import.meta.env.VITE_APP);
                toast.error("Error fetching chat");
            }
        };

        fetchAllMessages();
    }, [refreshSideBar, token, chatId]);

    useEffect(() => {
        incomingMessage && setAllMessages((prev) => [incomingMessage, ...prev]);
    }, [incomingMessage]);

    return loaded ? (
        <div className="h-full w-full sm:w-[55%] md:w-3/5 lg:w-[70%] flex flex-col justify-center items-center gap-2.5 border-b-[6px] border-[#63d7b0] rounded-5xl sm:rounded-s-none p-5">
            <ChatAreaHeader recieverData={location?.state?.recieverData} />
            <MessagesContainer allMessages={allMessages} />
            <SendMessageInput
                recieverDataId={location?.state?.recieverData._id}
                senderId={userData._id}
                setLoading={setLoading}
            />
        </div>
    ) : (
        <div className="h-full w-full sm:w-[55%] md:w-3/5 lg:w-[70%] border-[20px] p-2.5 flex flex-col gap-2.5">
            <Skeleton
                variant="rectangular"
                sx={{ width: "100%", borderRadius: "10px" }}
                height={60}
            />
            <Skeleton
                variant="rectangular"
                sx={{
                    width: "100%",
                    borderRadius: "10px",
                    flexGrow: "1",
                }}
            />
            <Skeleton
                variant="rectangular"
                sx={{ width: "100%", borderRadius: "10px" }}
                height={60}
            />
        </div>
    );
};

export default ChatPage;
