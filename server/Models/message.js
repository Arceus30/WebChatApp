const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
    {
        senderId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        recieverId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
        },
        fileContent: [
            {
                fileType: { type: String },
                url: {
                    type: String,
                },
                fileName: {
                    type: String,
                },
            },
        ],
        conversationId: {
            type: Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Message", messageSchema);
