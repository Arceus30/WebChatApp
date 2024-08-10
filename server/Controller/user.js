const { User } = require("../Models");

const {
    comparePwd,
    hashPassword,
    generateAccessToken,
    generateRefreshToken,
} = require("../Helper/auth.js");

const ExpressError = require("../Services/ExpressError.js");

const allUsers = async (req, res, next) => {
    const user = req.user;
    const { query } = req.query;
    try {
        let allUsers;
        if (query !== "") {
            allUsers = await User.find({
                _id: { $ne: user._id },
                name: { $regex: query, $options: "i" },
            })
                .select("name picture.url")
                .sort("name");
        } else {
            allUsers = await User.find({
                _id: { $ne: user._id },
            })
                .select("name picture.url")
                .sort("name");
        }

        return res.status(200).json(allUsers);
    } catch (e) {
        console.error(e);
        next(new ExpressError(500, "Internal Server Error"));
    }
};

const login = async (req, res, next) => {
    try {
        const { user } = req.body;
        user.email = user.email.toLowerCase();
        const userFound = await User.findOne({ email: user.email });
        if (!userFound) {
            return next(new ExpressError(404, "User not found"));
        }
        const isMatched = await comparePwd(user.password, userFound.password);
        if (!isMatched) {
            return next(new ExpressError(401, "Incorrect Email or Password"));
        }
        const accessToken = await generateAccessToken(userFound._id);
        const refreshToken = await generateRefreshToken(userFound._id);

        return res
            .status(200)
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            })
            .json({
                accessToken,
                userData: {
                    _id: userFound._id,
                    name: userFound.name,
                    email: userFound.email,
                    pictureUrl: userFound.picture.url,
                },
            });
    } catch (e) {
        console.error(e);
        return next(new ExpressError(500, "Internal Server Error"));
    }
};

const register = async (req, res, next) => {
    const { user } = req.body;
    user.picture = null;
    const file = req.file;
    user.picture = {
        url: file?.path,
        fileName: file?.filename,
    };
    try {
        user.email = user.email.toLowerCase();
        const userExist = await User.findOne({ email: user.email });
        if (userExist) {
            return next(new ExpressError(409, "User already Exists"));
        }
        user.password = await hashPassword(user.password);
        const userCreated = new User(user);
        await userCreated.save();

        const accessToken = await generateAccessToken(userCreated._id);
        const refreshToken = await generateRefreshToken(userCreated._id);

        return res
            .status(200)
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            })
            .json({
                accessToken,
                userData: {
                    _id: userCreated._id,
                    name: userCreated.name,
                    email: userCreated.email,
                    pictureUrl: userCreated.picture.url,
                },
            });
    } catch (e) {
        console.error(e);
        return next(new ExpressError(500, "Internal Server Error"));
    }
};

const refreshToken = async (req, res, next) => {
    const user = req.user;
    try {
        const accessToken = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);
        return res
            .status(200)
            .cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            })
            .json({
                accessToken,
                userData: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    pictureUrl: user.picture.url,
                },
            });
    } catch (e) {
        console.error(e);
        next(new ExpressError(500, "Internal Server Error"));
    }
};

module.exports = {
    allUsers,
    login,
    register,
    refreshToken,
};
