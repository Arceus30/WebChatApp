import React, { useState, useEffect } from "react";
import MainPageSideBarHeader from "./MainPageSideBarHeader.jsx";
import MainPageSideBarSearchBar from "./MainPageSideBarSearchBar.jsx";
import MainPageSideBarConversations from "./MainPageSideBarConversations.jsx";
import { useSelector } from "react-redux";
import { useAPI } from "../../Helper/api/api.jsx";
const MainPageSideBar = ({ setLoading }) => {
    const [query, setQuery] = useState("");
    const { token, userData } = useSelector((state) => state.user);
    const [conversations, setConversations] = useState(null);
    const { refresh } = useSelector((state) => state.refresh);
    const { fetchConversationsAPI } = useAPI();

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                await fetchConversationsAPI(
                    setConversations,
                    setLoading,
                    token,
                    query
                );
            } catch (e) {
                console.error(e);
                navigate(import.meta.env.VITE_HOME);
                toast.error("Error fetching conversations");
            }
        };
        fetchConversations();
    }, [query, refresh]);

    return (
        <div className="hidden sm:flex flex-col sm:w-[45%] md:w-2/5 lg:w-[30%]">
            <MainPageSideBarHeader userPicture={userData.pictureUrl} />
            <MainPageSideBarSearchBar query={query} setQuery={setQuery} />
            <MainPageSideBarConversations conversations={conversations} />
        </div>
    );
};

export default MainPageSideBar;
