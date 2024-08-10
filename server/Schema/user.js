const Joi = require("joi");

const upperCaseRegex = /[A-Z]/;
const lowerCaseRegex = /[a-z]/;
const digitRegex = /\d/;
const specialCharRegex = /[\W_]/;

const validatePassword = (password) => {
    if (password.length < 8 || password.length > 20) {
        return "Password must be between 8 and 20 characters long.";
    }
    if (!upperCaseRegex.test(password)) {
        return "Password must contain at least one uppercase letter.";
    }
    if (!lowerCaseRegex.test(password)) {
        return "Password must contain at least one lowercase letter.";
    }
    if (!digitRegex.test(password)) {
        return "Password must contain at least one digit.";
    }
    if (!specialCharRegex.test(password)) {
        return "Password must contain at least one special character.";
    }
    return null;
};

const loginSchema = Joi.object({
    user: Joi.object({
        email: Joi.string().email().min(1).required(),
        password: Joi.string()
            .required()
            .custom((value, helpers) => {
                const errorMessage = validatePassword(value);
                if (errorMessage) {
                    return helpers.message(errorMessage);
                }
                return value;
            }),
    }).required(),
});

const registerSchema = Joi.object({
    user: Joi.object({
        name: Joi.string().min(1).required(),
        email: Joi.string().email().min(1).required(),
        password: Joi.string()
            .required()
            .custom((value, helpers) => {
                const errorMessage = validatePassword(value);
                if (errorMessage) {
                    return helpers.message(errorMessage);
                }
                return value;
            }),
    }).required(),
});

module.exports = { loginSchema, registerSchema };
