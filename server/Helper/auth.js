const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const hashPassword = async (plainPwd) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plainPwd, salt);
        return hashedPassword;
    } catch (e) {
        console.error(e);
        return undefined;
    }
};

const comparePwd = async (plainPwd, hashedPwd) => {
    try {
        const isMatched = await bcrypt.compare(plainPwd, hashedPwd);
        return isMatched;
    } catch (e) {
        console.error(e);
        return false;
    }
};

const generateAccessToken = async (Id) => {
    try {
        const payload = {
            userId: Id,
        };
        return jwt.sign(payload, process.env.ACCESS_SECRET, {
            expiresIn: "1h",
        });
    } catch (e) {
        console.error(e);
        return undefined;
    }
};

const generateRefreshToken = async (Id) => {
    try {
        const payload = {
            userId: Id,
        };
        return jwt.sign(payload, process.env.REFRESH_SECRET, {
            expiresIn: "30d",
        });
    } catch (e) {
        console.error(e);
        return undefined;
    }
};

module.exports = {
    hashPassword,
    comparePwd,
    generateAccessToken,
    generateRefreshToken,
};
