import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Toaster from "./Toaster.jsx";
import { Provider } from "react-redux";
import store from "./Store";
const App = lazy(() => import("./App"));

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
            <Toaster />
        </Provider>
    </React.StrictMode>
);
