import { createBrowserRouter } from "react-router-dom";
import AddUserPage from "../Pages/AddUserPage.jsx";
import ChatPage from "../Pages/ChatPage.jsx";
import ErrorPage from "../Pages/ErrorPage";
import LoginPage from "../Pages/LoginPage";
import MainPage from "../Pages/MainPage.jsx";
import WelcomePage from "../Pages/WelcomePage.jsx";

const routes = createBrowserRouter([
    {
        path: import.meta.env.VITE_HOME,
        element: <LoginPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: import.meta.env.VITE_APP,
        element: <MainPage />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <WelcomePage />,
            },
            {
                path: import.meta.env.VITE_CHAT,
                element: <ChatPage />,
            },
            {
                path: import.meta.env.VITE_ADD_USER,
                element: <AddUserPage />,
            },
        ],
    },
]);

export default routes;
