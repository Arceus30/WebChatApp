import axios from "axios";
import { login } from "../../../Store/userSlice";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

export const registerAPI = async (
    data,
    setLoading,
    file,
    socket,
    dispatch,
    navigate,
    location
) => {
    setLoading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("user", JSON.stringify(data));
    try {
        const res = await axios.post(
            import.meta.env.VITE_BASE_API +
                import.meta.env.VITE_API_USER +
                import.meta.env.VITE_API_REGISTER,
            fd,
            { withCredentials: true }
        );
        dispatch(login(res.data));
        console.log("Socket Before", socket);
        console.log("Socket Before", socket.current);
        socket.current = io(import.meta.env.VITE_SOCKET_ORIGIN);
        console.log("Socket After", socket);
        console.log("Socket After", socket.current);
        navigate(location.state?.prevUrl || import.meta.env.VITE_APP);
        toast.success("SignUp Successful");
        setLoading(false);
    } catch (e) {
        console.error(e);
        toast.error(e.response ? e.response.data.message : "SignUp Error");
        setLoading(false);
    }
};
