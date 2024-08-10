const { Schema, model } = require("mongoose");

const conversationSchema = new Schema(
    {
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        latestMessage: {
            type: Schema.Types.ObjectId,
            ref: "Message",
        },
    },
    {
        timestamps: true,
    }
);

conversationSchema.path("members").validate(function (members) {
    return members.length == 2;
}, "A conversation must have at least 2 members.");

module.exports = model("Conversation", conversationSchema);
