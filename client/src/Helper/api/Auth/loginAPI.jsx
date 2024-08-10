import axios from "axios";
import { login } from "../../../Store/userSlice";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

export const loginAPI = async (
    data,
    setLoading,
    socket,
    dispatch,
    navigate,
    location
) => {
    setLoading(true);
    try {
        const res = await axios.post(
            import.meta.env.VITE_BASE_API +
                import.meta.env.VITE_API_USER +
                import.meta.env.VITE_API_LOGIN,
            data,
            { withCredentials: true }
        );
        dispatch(login(res.data));
        console.log("Socket Before", socket);
        console.log("Socket Before", socket.current);
        socket.current = io(import.meta.env.VITE_SOCKET_ORIGIN);
        console.log("Socket After", socket);
        console.log("Socket After", socket.current);
        navigate(location.state?.prevUrl || import.meta.env.VITE_APP);
        toast.success("Login Successful");
        setLoading(false);
    } catch (e) {
        toast.error(e.response ? e.response.data.message : "Login Error");
        setLoading(false);
    }
};
