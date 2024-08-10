import axios from "axios";
import { toggleRefresh } from "../../../Store/refreshSlice";
import { refreshTokenAPI } from "../Auth/refreshTokenAPI";
import CryptoJS from "crypto-js";

const decryptMessage = (message) => {
    const bytes = CryptoJS.AES.decrypt(
        message,
        import.meta.env.VITE_ENCRYPTION_SECRET
    );

    const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedMessage;
};

export const sendMessageAPI = async (
    token,
    recieverId,
    chatId,
    data,
    files,
    setLoading,
    dispatch,
    socket
) => {
    try {
        setLoading(true);
        const fd = new FormData();
        files?.forEach((file) => {
            fd.append("files", file);
        });
        fd.append("messageData", JSON.stringify(data));

        const config = {
            headers: {
                authorization: `Bearer ${token}`,
            },
            params: { recieverId, chatId },
            withCredentials: true,
        };
        const res = await axios.post(
            import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_MESSAGE,
            fd,
            config
        );
        const messageSent = {
            ...res.data.messageCreated,
            content: decryptMessage(res.data.messageCreated.content),
        };
        socket?.current?.emit("sendMessage", messageSent);
        dispatch(toggleRefresh());
        setLoading(false);
    } catch (e) {
        if (e?.response?.data?.message === "jwt expired") {
            try {
                const newToken = await refreshTokenAPI(dispatch);
                sendMessageAPI(
                    newToken,
                    recieverId,
                    chatId,
                    data,
                    files,
                    setLoading,
                    dispatch
                );
            } catch (err) {
                console.error(err);
            }
        } else {
            console.error(e);
        }
        setLoading(false);
    }
};
