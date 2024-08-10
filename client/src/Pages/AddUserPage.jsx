import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../assets/live-chat_512px.png";
import { IconButton, Typography, Box } from "@mui/material";
import { Search, Refresh, AccountCircle } from "@mui/icons-material";
import { toggleRefresh } from "../Store/refreshSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import { useAPI } from "../Helper/api/api";

const AddUserPage = () => {
    const [fetchedUsers, setFetchedUsers] = useState(null);
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const { token, setLoading } = useOutletContext();
    const refresh = useSelector((state) => state.refresh.refresh);
    const { fetchUsersAPI, createChatAPI } = useAPI();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                await fetchUsersAPI(setFetchedUsers, setLoading, token, query);
            } catch (e) {
                console.error(e);
                navigate(import.meta.env.VITE_HOME);
                toast.error("Error fetching users");
            }
        };
        fetchUsers();
    }, [query, refresh]);

    const createChat = async (reciever) => {
        try {
            await createChatAPI(reciever, token, setLoading);
        } catch (e) {
            console.error(e);
            navigate(import.meta.env.VITE_HOME);
            toast.error("Error Starting Chat");
        }
    };
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                    duration: ".7",
                }}
                className="h-full w-full sm:w-[55%] md:w-3/5 lg:w-[70%] flex flex-col justify-center items-center gap-5 border-b-[6px] border-[#63d7b0] rounded-5xl sm:rounded-s-none p-2.5"
            >
                <div className="bg-white shadow-c2 rounded-5xl items-center flex w-full">
                    <img
                        src={logo}
                        style={{
                            height: "2rem",
                            width: "2rem",
                            marginLeft: "10px",
                        }}
                    />
                    <Typography
                        component="p"
                        className="customHead1 w-3/6 md:w-3/6 lg:w-2/6"
                        style={{ marginLeft: "10px" }}
                    >
                        Available Users
                    </Typography>
                    <IconButton
                        onClick={() => {
                            dispatch(toggleRefresh());
                        }}
                        sx={{
                            paddingX: ".5rem",
                            paddingY: 0,
                        }}
                    >
                        <Refresh />
                    </IconButton>
                    <input
                        type="text"
                        placeholder="Search Users"
                        className="outline-none border-none text-sm sm:text-base w-full"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                    />
                    <IconButton>
                        <Search />
                    </IconButton>
                </div>
                <div className="grow overflow-auto p-2.5 w-full ">
                    {fetchedUsers &&
                        fetchedUsers.map((fetchedUser, index) => (
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                key={index}
                                className="flex bg-white shadow-c2 cursor-pointer rounded-2xl p-2.5 m-2.5 select-none items-center "
                                onClick={() => createChat(fetchedUser)}
                            >
                                <Box className="rounded-full px-2.5">
                                    {!fetchedUser.picture?.url ? (
                                        <AccountCircle
                                            sx={{
                                                color: "#5d5656",
                                                height: "3.5rem",
                                                width: "3.5rem",
                                            }}
                                        />
                                    ) : (
                                        <img
                                            src={fetchedUser.picture?.url}
                                            alt="dp"
                                            className="rounded-full h-14 w-14"
                                        />
                                    )}
                                </Box>
                                <Typography sx={{ fontSize: "1.3rem" }}>
                                    {fetchedUser?.name}
                                </Typography>
                            </motion.div>
                        ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AddUserPage;
