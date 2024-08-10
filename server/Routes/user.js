const express = require("express");

const multer = require("multer");
const { storage } = require("../Cloudinary");
const upload = multer({ storage });

const { userMiddleware } = require("../Middleware");
const { userController } = require("../Controller");
const router = express.Router();

router
    .route("/")
    .get(userMiddleware.verifyAccessToken, userController.allUsers);

router
    .route(process.env.LOGIN)
    .post(userMiddleware.login, userController.login);

router.route(process.env.REGISTER).post(
    upload.single("file"),
    (req, res, next) => {
        req.body = JSON.parse(req.body.user);
        next();
    },
    userMiddleware.register,
    userController.register
);

router
    .route(process.env.REFRESH_TOKEN)
    .get(userMiddleware.verifyRefreshToken, userController.refreshToken);

module.exports = router;
