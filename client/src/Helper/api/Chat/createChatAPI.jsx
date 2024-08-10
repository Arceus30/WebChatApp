import axios from "axios";
import { toggleRefresh } from "../../../Store/refreshSlice";
import { toast } from "react-toastify";
import { refreshTokenAPI } from "../Auth/refreshTokenAPI";

export const createChatAPI = async (
    reciever,
    token,
    setLoading,
    dispatch,
    navigate
) => {
    setLoading(true);
    const config = {
        headers: {
            authorization: `Bearer ${token}`,
        },
        withCredentials: true,
    };
    try {
        const res = await axios.post(
            import.meta.env.VITE_BASE_API +
                import.meta.env.VITE_API_CONVERSATION,
            { reciever },
            config
        );
        navigate(
            import.meta.env.VITE_APP +
                "/" +
                import.meta.env.VITE_CHAT.replace(":chatId", res.data?._id),
            {
                state: { recieverData: res.data.members[0] },
            }
        );
        if (res.status === 201) {
            toast.success("Chat Created Successfully");
        }
        setLoading(false);
        dispatch(toggleRefresh());
    } catch (e) {
        if (e?.response?.data?.message === "jwt expired") {
            try {
                const newToken = await refreshTokenAPI(dispatch);
                createChatAPI(
                    reciever,
                    newToken,
                    setLoading,
                    dispatch,
                    navigate
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
