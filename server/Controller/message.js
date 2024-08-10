const { Message, Conversation } = require("../Models");
const ExpressError = require("../Services/ExpressError");

const allMessages = async (req, res, next) => {
    const { chatId } = req.query;
    try {
        const messages = await Message.find({ conversationId: chatId }).sort({
            createdAt: -1,
        });
        return res.status(200).json({ messages });
    } catch (e) {
        console.error(e);
        return next(new ExpressError(500, "Internal Server Error"));
    }
};
const sendMessage = async (req, res, next) => {
    const { recieverId, chatId } = req.query;
    const files = req.files?.map((file) => ({
        fileType: file.mimetype,
        url: file.path,
        fileName: file.filename,
    }));
    const { message } = req.body;
    const user = req.user;
    try {
        const chatRoom = await Conversation.findById(chatId);
        if (!chatRoom) {
            return res.status(404).json({
                msg: "ChatRoom does not exist, Message cannot be sent",
            });
        }

        const messageObj = {
            senderId: user._id,
            recieverId: recieverId,
            content: message.text,
            conversationId: chatId,
            fileContent: files,
        };

        const messageCreated = new Message(messageObj);
        chatRoom.latestMessage = messageCreated._id;
        await messageCreated.save();
        await chatRoom.save();
        return res.status(200).json({ messageCreated });
    } catch (e) {
        console.error(e);
        return next(new ExpressError(500, "Internal Server Error"));
    }
};

module.exports = {
    allMessages,
    sendMessage,
};
