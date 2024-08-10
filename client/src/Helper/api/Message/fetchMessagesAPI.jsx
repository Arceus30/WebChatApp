import axios from "axios";
import { refreshTokenAPI } from "../Auth/refreshTokenAPI";
import CryptoJS from "crypto-js";

const decryptMessage = (encryptedMessage) => {
    const bytes = CryptoJS.AES.decrypt(
        encryptedMessage,
        import.meta.env.VITE_ENCRYPTION_SECRET
    );
    return bytes.toString(CryptoJS.enc.Utf8);
};
export const fetchMessagesAPI = async (
    token,
    chatId,
    setAllMessages,
    setLoaded,
    dispatch
) => {
    setLoaded(false);
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        },
        params: { chatId },
        withCredentials: true,
    };
    try {
        const res = await axios.get(
            import.meta.env.VITE_BASE_API + import.meta.env.VITE_API_MESSAGE,
            config
        );
        const messages = res.data.messages;
        const decryptedMessages = messages.map((message) => {
            return {
                ...message,
                content: decryptMessage(message.content),
            };
        });
        setAllMessages(decryptedMessages);
        setLoaded(true);
    } catch (e) {
        if (e?.response?.data?.message === "jwt expired") {
            try {
                const newToken = await refreshTokenAPI(dispatch);
                fetchMessagesAPI(
                    newToken,
                    chatId,
                    setAllMessages,
                    setLoaded,
                    dispatch
                );
            } catch (err) {
                console.error(err);
            }
        } else {
            console.error(e);
        }
        setLoaded(true);
    }
};
