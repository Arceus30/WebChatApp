import React, { useContext } from "react";
import { loginAPI } from "./Auth/loginAPI";
import { registerAPI } from "./Auth/registerAPI";

import { fetchUsersAPI } from "./User/fetchUsersAPI";

import { createChatAPI } from "./Chat/createChatAPI";
import { fetchConversationsAPI } from "./Chat/fetchConversationsAPI";

import { fetchMessagesAPI } from "./Message/fetchMessagesAPI";
import { sendMessageAPI } from "./Message/sendMessageAPI";

import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { AccountContext } from "../../Context/AccountContext";

export const useAPI = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { socket } = useContext(AccountContext);

    const boundLoginAPI = (data, setLoading) =>
        loginAPI(data, setLoading, socket, dispatch, navigate, location);

    const boundRegisterAPI = (data, setLoading, file) =>
        registerAPI(
            data,
            setLoading,
            file,
            socket,
            dispatch,
            navigate,
            location
        );

    const boundFetchConversationsAPI = (
        setConversations,
        setLoading,
        token,
        query
    ) =>
        fetchConversationsAPI(
            setConversations,
            setLoading,
            token,
            query,
            dispatch
        );

    const boundFetchUsersAPI = (setFetchedUsers, setLoading, token, query) =>
        fetchUsersAPI(setFetchedUsers, setLoading, token, query, dispatch);

    const boundCreateChatAPI = (reciever, token, setLoading) =>
        createChatAPI(reciever, token, setLoading, dispatch, navigate);

    const boundFetchMessagesAPI = (token, chatId, setAllMessages, setLoaded) =>
        fetchMessagesAPI(token, chatId, setAllMessages, setLoaded, dispatch);

    const boundSendMessageAPI = (
        token,
        recieverId,
        chatId,
        data,
        files,
        setLoading
    ) => {
        return sendMessageAPI(
            token,
            recieverId,
            chatId,
            data,
            files,
            setLoading,
            dispatch,
            socket
        );
    };

    return {
        loginAPI: boundLoginAPI,
        registerAPI: boundRegisterAPI,
        createChatAPI: boundCreateChatAPI,
        fetchUsersAPI: boundFetchUsersAPI,
        fetchConversationsAPI: boundFetchConversationsAPI,
        fetchMessagesAPI: boundFetchMessagesAPI,
        sendMessageAPI: boundSendMessageAPI,
    };
};
