import React from "react";
import { useForm } from "react-hook-form";
import { Box, TextField, Button } from "@mui/material";
import { customPasswordValidation } from "../../Helper/passwordValidation";
import { onError } from "../../Helper/onError";
import { useAPI } from "../../Helper/api/api.jsx";

const LoginForm = ({ setShowLogin, setLoading }) => {
    const form = useForm({ mode: "onBlur" });
    const { register, handleSubmit, formState, reset } = form;
    const { errors, isValid, isDirty, isSubmitting } = formState;
    const { loginAPI } = useAPI();

    const onSubmit = async (data) => {
        try {
            await loginAPI(data, setLoading);
        } catch (e) {
            console.error(e);
            reset();
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-10">
            <h1 className="text-xl sm:text-4xl lg:text-6xl xl:text-7xl font-semibold">
                Sign in to your Account
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="sm:w-1/2 flex flex-col gap-5"
            >
                <Box>
                    <TextField
                        variant="outlined"
                        color="secondary"
                        id="email"
                        fullWidth
                        label="Enter your Email"
                        autoComplete="email"
                        {...register("user.email", {
                            required: {
                                value: true,
                                message: "*Email is required",
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: "*Invalid Email Address",
                            },
                        })}
                        error={!!errors.user?.email}
                        helperText={errors.user?.email?.message}
                        sx={{
                            "& .MuiInputLabel-root": {
                                fontSize: "1.1rem ",
                            },
                            "& .MuiFormHelperText-root": {
                                fontSize: "1rem ",
                                marginLeft: "6px",
                            },
                            "& #email": {
                                fontSize: "1rem ",
                            },
                        }}
                    />
                </Box>
                <Box>
                    <TextField
                        variant="outlined"
                        color="secondary"
                        id="password"
                        fullWidth
                        type="password"
                        label="Enter your Password"
                        autoComplete="current-password"
                        {...register("user.password", {
                            required: {
                                value: true,
                                message: "*Password is required",
                            },
                            validate: customPasswordValidation,
                        })}
                        error={!!errors.user?.password}
                        helperText={errors.user?.password?.message}
                        sx={{
                            "& .MuiInputLabel-root": {
                                fontSize: "1.1rem ",
                            },
                            "& .MuiFormHelperText-root": {
                                fontSize: "1rem ",
                                marginLeft: "6px",
                            },
                            "& #password": {
                                fontSize: "1rem ",
                            },
                        }}
                    />
                </Box>
                <Box>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="Submit"
                        disabled={!isDirty || !isValid || isSubmitting}
                    >
                        Sign In
                    </Button>
                </Box>
            </form>
            <h1 className="text-base md:text-lg lg:text-2xl font-semibold">
                Don't have an Account{" ? "}
                <span
                    onClick={() => {
                        setShowLogin(false);
                    }}
                    className="text-[darkviolet] underline cursor-pointer"
                >
                    Sign Up
                </span>
            </h1>
        </div>
    );
};

export default LoginForm;
