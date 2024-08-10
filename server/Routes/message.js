const express = require("express");
const router = express.Router();

const { messageController } = require("../Controller");

const multer = require("multer");
const { storage } = require("../Cloudinary");
const upload = multer({ storage });

router
    .route("/")
    .get(messageController.allMessages)
    .post(
        upload.array("files", 10),
        (req, res, next) => {
            if (req.body.messageData) {
                req.body = JSON.parse(req.body.messageData);
            }
            next();
        },
        messageController.sendMessage
    );

module.exports = router;
