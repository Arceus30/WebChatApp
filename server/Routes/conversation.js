const express = require("express");
const router = express.Router();
const { conversationController } = require("../Controller");

router
    .route("/")
    .get(conversationController.allChats)
    .post(conversationController.createChat);

module.exports = router;
