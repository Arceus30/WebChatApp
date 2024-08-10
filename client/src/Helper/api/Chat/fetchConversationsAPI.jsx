import axios from "axios";
import { refreshTokenAPI } from "../Auth/refreshTokenAPI";

export const fetchConversationsAPI = async (
    setConversations,
    setLoading,
    token,
    query,
    dispatch
) => {
    setLoading(true);
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        },
        params: { query },
        withCredentials: true,
    };
    try {
        const res = await axios.get(
            import.meta.env.VITE_BASE_API +
                import.meta.env.VITE_API_CONVERSATION,
            config
        );
        setConversations(res.data.allConversations);
        setLoading(false);
    } catch (e) {
        if (e?.response?.data?.message === "jwt expired") {
            try {
                const newToken = await refreshTokenAPI(dispatch);
                fetchConversationsAPI(
                    setConversations,
                    setLoading,
                    newToken,
                    query,
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
