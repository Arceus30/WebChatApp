const { Schema, model } = require("mongoose");

const userSchema = new Schema(
    {
        name: {
            type: String,
            requried: true,
        },
        email: {
            type: String,
            requried: true,
        },
        password: {
            type: String,
            requried: true,
        },
        picture: {
            url: {
                type: String,
            },
            fileName: {
                type: String,
            },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("User", userSchema);
