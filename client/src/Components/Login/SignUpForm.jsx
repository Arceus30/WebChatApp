import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, TextField, Button, Typography } from "@mui/material";
import { customPasswordValidation } from "../../Helper/passwordValidation";
import { styled } from "@mui/material/styles";
import { CloudUpload } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { onError } from "../../Helper/onError";
import { useAPI } from "../../Helper/api/api";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: "100%",
});

const DropzoneWrapper = styled(Box)({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px dashed",
});

const SignUpForm = ({ setShowLogin, setLoading }) => {
    const form = useForm({ mode: "onBlur" });
    const { register, handleSubmit, formState, reset } = form;
    const { errors, isValid, isDirty, isSubmitting } = formState;
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const { registerAPI } = useAPI();

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length === 1) {
                setFile(acceptedFiles[0]);
                setErrorMessage("");
            } else {
                setFile(null);
                setErrorMessage("You can only upload one image.");
            }
        },
        onDropRejected: (rejectedFiles) => {
            setFile(null);
            setErrorMessage(
                "File type not accepted. Please upload an image file."
            );
            if (rejectedFiles.length > 1) {
                setErrorMessage(
                    "Photo Upload Failed. Please Select only one image file"
                );
            }
        },
        multiple: false,
        maxFiles: 1,
        accept: { "image/*": [] },
    });

    const onSubmit = async (data) => {
        try {
            await registerAPI(data, setLoading, file);
        } catch (e) {
            console.error(e);
            reset();
            setFile(null);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-10">
            <h1 className="text-xl sm:text-4xl lg:text-6xl xl:text-7xl font-semibold">
                Create a new Account
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="sm:w-1/2 flex flex-col gap-5"
            >
                <Box>
                    <TextField
                        variant="outlined"
                        color="secondary"
                        id="name"
                        fullWidth
                        label="Enter your Name"
                        autoComplete="name"
                        {...register("user.name", {
                            required: {
                                value: true,
                                message: "*Name is required",
                            },
                        })}
                        error={!!errors.user?.name}
                        helperText={errors.user?.name?.message}
                        sx={{
                            "& .MuiInputLabel-root": {
                                fontSize: "1.1rem ",
                            },
                            "& .MuiFormHelperText-root": {
                                fontSize: "1rem ",
                                marginLeft: "6px",
                            },
                            "& #name": {
                                fontSize: "1rem ",
                            },
                        }}
                    />
                </Box>
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
                    <DropzoneWrapper {...getRootProps()}>
                        <VisuallyHiddenInput
                            type="file"
                            aria-label="Upload Profile Photo"
                            {...getInputProps()}
                        />
                        <Typography
                            component="label"
                            className="w-full flex justify-center items-center gap-2"
                            sx={{ marginY: ".25rem" }}
                        >
                            <CloudUpload sx={{ fontSize: "2rem" }} />
                            Upload Profile Photo
                        </Typography>
                    </DropzoneWrapper>
                    <Box className="text-gray-600 break-words sm:text-lg">
                        {errorMessage === ""
                            ? file?.name !== "" && file?.name
                            : errorMessage}
                    </Box>
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        fullWidth
                        color="primary"
                        type="submit"
                        disabled={!isDirty || !isValid || isSubmitting}
                    >
                        Sign Up
                    </Button>
                </Box>
            </form>
            <h1 className="text-base md:text-lg lg:text-2xl font-semibold">
                Already have an Account{" ? "}
                <span
                    onClick={() => {
                        setShowLogin(true);
                    }}
                    className="text-[darkviolet] underline cursor-pointer"
                >
                    Sign In
                </span>
            </h1>
        </div>
    );
};

export default SignUpForm;
