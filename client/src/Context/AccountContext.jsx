import { createContext, useState, useEffect, useRef } from "react";

export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
    const [activeUsers, setActiveUsers] = useState([]);
    const socket = useRef();

    return (
        <AccountContext.Provider
            value={{
                socket,
                activeUsers,
                setActiveUsers,
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
