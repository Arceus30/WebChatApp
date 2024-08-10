require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectionDB = require("./Services/connection");
connectionDB();

const ExpressError = require("./Services/ExpressError");

const { userRoutes, conversationRoutes, messageRoutes } = require("./Routes");

const { userMiddleware } = require("./Middleware");

const app = express();
app.use(
    cors({
        origin: [process.env.ALLOWED_ORIGIN_1],
        optionsSuccessStatus: 200,
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("API is running123");
});

app.use(process.env.USER, userRoutes);
app.use(
    process.env.CONVERSATION,
    userMiddleware.verifyAccessToken,
    conversationRoutes
);
app.use(process.env.MESSAGE, userMiddleware.verifyAccessToken, messageRoutes);

app.all("*", (req, res, next) => {
    return next(new ExpressError(404, "Page not Found"));
});

app.use((err, req, res, next) => {
    console.error(err);
    return res
        .status(err.status || 500)
        .json({ message: err.message || "Server error" });
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
