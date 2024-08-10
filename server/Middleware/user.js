const { userSchema } = require("../Schema");
const ExpressError = require("../Services/ExpressError");
const jwt = require("jsonwebtoken");
const { User } = require("../Models");

const register = async (req, res, next) => {
    const { error } = userSchema.registerSchema.validate(req.body, {
        abortEarly: true,
    });
    if (error) {
        next(new ExpressError(400, "Bad Request"));
    }
    next();
};
const login = async (req, res, next) => {
    const { error } = userSchema.loginSchema.validate(req.body, {
        abortEarly: true,
    });
    if (error) {
        next(new ExpressError(400, "Bad Request"));
    }
    next();
};

const verifyAccessToken = async (req, res, next) => {
    if (!req.headers || !req.headers.authorization) {
        return next(new ExpressError(404, "request header not found"));
    }
    const authorization = req.headers.authorization;
    const accessToken = authorization.split(" ")[1];
    if (!authorization.startsWith("Bearer") || !accessToken) {
        return next(new ExpressError(404, "Token not found"));
    }
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET);
        const { userId } = decoded;
        const user = await User.findById({ _id: userId });
        if (!user) {
            return next(
                new ExpressError(401, "User Does not exist invalid token")
            );
        }
        req.user = user;
        next();
    } catch (e) {
        return next(new ExpressError(401, e.message));
    }
};

const verifyRefreshToken = async (req, res, next) => {
    if (!req.cookies) {
        return next(new ExpressError(404, "Cookies does not exists"));
    }
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return next(new ExpressError(404, "Token not found"));
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        const { userId } = decoded;
        const user = await User.findById({ _id: userId });
        if (!user) {
            return next(
                new ExpressError(401, "user does not exists invalid token")
            );
        }
        req.user = user;
        next();
    } catch (e) {
        return next(new ExpressError(401, e.message));
    }
};

module.exports = {
    login,
    register,
    verifyAccessToken,
    verifyRefreshToken,
};
