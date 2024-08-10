import React from "react";
import { IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";

const MainPageSideBarSearchBar = ({ query, setQuery }) => {
    return (
        <div className="rounded-5xl shadow-c2 bg-white p-0.5 m-2.5 flex items-center">
            <IconButton>
                <Search className="icon" />
            </IconButton>
            <input
                type="text"
                placeholder="Search"
                className="outline-none border-none text-lg w-full"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                }}
            />
        </div>
    );
};

export default MainPageSideBarSearchBar;
