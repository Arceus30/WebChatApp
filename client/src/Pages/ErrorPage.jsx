import React, { useEffect, useState } from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);
    const [countDown, setCountDown] = useState(30);
    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            window.location.href = import.meta.env.VITE_APP;
        }, 30000);

        const timerInterval = setInterval(() => {
            setCountDown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        return () => {
            clearTimeout(redirectTimer);
            clearInterval(timerInterval);
        };
    }, []);
    return (
        <div className="h-full flex flex-col">
            <div className="text-xl my-5 py-5 flex flex-col items-center">
                <h1 className="font-semibold">Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
                <p>Page will redirect in {countDown}</p>
            </div>
        </div>
    );
};

export default ErrorPage;
