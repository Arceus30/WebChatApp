export const customPasswordValidation = (value) => {
    if (value.length < 8) {
        return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(value)) {
        return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(value)) {
        return "Password must contain at least one lowercase letter";
    }
    if (!/\d/.test(value)) {
        return "Password must contain at least one digit";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        return "Password must contain at least one special character";
    }
    return true;
};
