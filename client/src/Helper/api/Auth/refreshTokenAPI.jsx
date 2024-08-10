import axios from "axios";
import { login } from "../../../Store/userSlice";

export const refreshTokenAPI = async (dispatch) => {
    try {
        const res = await axios.get(
            import.meta.env.VITE_BASE_API +
                import.meta.env.VITE_API_USER +
                import.meta.env.VITE_API_REFRESH_TOKEN,
            { withCredentials: true }
        );
        dispatch(login(res.data));
        return res.data.accessToken;
    } catch (e) {
        console.error(e);
    }
};
