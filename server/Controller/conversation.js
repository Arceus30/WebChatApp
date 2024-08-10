const ExpressError = require("../Services/ExpressError");
const { Conversation } = require("../Models");

const allChats = async (req, res, next) => {
    const user = req.user;
    const { query } = req.query;
    try {
        let allConversations = await Conversation.find({
            members: { $in: [user._id] },
        })
            .populate({ path: "members", select: "name picture.url" })
            .populate({ path: "latestMessage", select: "content fileContent" })
            .sort({ updatedAt: -1 });

        allConversations = allConversations.map((conversation) => {
            return {
                ...conversation._doc,
                members: conversation.members.filter(
                    (member) => member._id.toString() !== user._id.toString()
                ),
            };
        });

        allConversations = allConversations.map((conversation) => {
            const chat = {
                ...conversation,
                conversationName: conversation.members[0].name,
            };
            return chat;
        });
        if (query !== "") {
            allConversations = allConversations.filter((conversation) =>
                conversation.conversationName
                    .toLowerCase()
                    .includes(query.toLowerCase())
            );
        }
        return res.status(200).json({ allConversations });
    } catch (e) {
        console.error(e);
        next(new ExpressError(500, "Internal Server Error"));
    }
};

const createChat = async (req, res, next) => {
    try {
        const user = req.user;
        const { reciever } = req.body;

        const chatExist = await Conversation.findOne({
            members: [user._id, reciever._id],
        }).populate({ path: "members", select: "name picture.url" });

        if (chatExist) {
            chatExist = chatExist.map((conversation) => {
                return {
                    ...conversation._doc,
                    members: conversation.members.filter(
                        (member) =>
                            member._id.toString() !== user._id.toString()
                    ),
                };
            });
            return res.status(200).json(chatExist);
        }

        const createChat = new Conversation({
            members: [user._id, reciever._id],
        });

        await createChat.save();

        let chatFound = await Conversation.findOne({
            members: [user._id, reciever._id],
        }).populate({ path: "members", select: "name picture.url" });
        chatFound.members = chatFound.members.filter(
            (member) => member._id.toString() !== user._id.toString()
        );
        return res.status(201).json(chatFound);
    } catch (e) {
        console.error(e);
        return next(new ExpressError(500, "Internal Server Error"));
    }
};

module.exports = {
    allChats,
    createChat,
};
