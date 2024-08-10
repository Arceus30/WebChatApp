import React from "react";
import moment from "moment";
import { PictureAsPdf, DownloadRounded } from "@mui/icons-material";
import { toast } from "react-toastify";

const FileDisplay = ({ file }) => {
    const fileType = file.fileType;
    if (fileType.startsWith("image")) {
        return (
            <img
                src={file.url}
                alt="File"
                className="max-w-[300px] max-h-[300px] my-2.5"
            />
        );
    }
    if (fileType.startsWith("video")) {
        return (
            <video
                controls
                src={file.url}
                className="max-w-[300px] max-h-[300px] my-2.5"
            />
        );
    }
    return (
        <button
            onClick={() => {
                handleDownload(file);
            }}
            className="underline text-blue-500 my-2.5 flex items-center gap-1.5"
        >
            Download {file.name}
            {fileType === "application/pdf" && <PictureAsPdf />}
        </button>
    );
};
const handleDownload = async (file) => {
    try {
        const res = await fetch(file.url);
        if (!res.ok) throw new Error("Network response was not ok");
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = file.fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (e) {
        console.error(e);
        toast.error("Cannot download file");
    }
};

const MessageSelf = ({ message }) => {
    return (
        <div className="bg-[#63d7b0] my-5 ms-auto p-2.5 rounded-xl w-max ">
            <div className="flex flex-col">
                <div className="mx-2.5">
                    {message.fileContent &&
                        message.fileContent.map((file, index) => {
                            return (
                                <div key={index} className="flex flex-row">
                                    <FileDisplay file={file} />
                                    <div className="flex items-end my-2.5">
                                        {file.fileType.startsWith("image") && (
                                            <DownloadRounded
                                                className="cursor-pointer"
                                                onClick={() => {
                                                    handleDownload(file);
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                </div>

                <div
                    className="break-all ms-1"
                    style={{ overflowWrap: "break-word" }}
                >
                    {message.content}
                </div>
                <div className="italic text-gray-600 flex flex-row-reverse">
                    <p>
                        {`${moment(message.createdAt).format(
                            "DD/MM/YY"
                        )} ${moment(message.createdAt).format("HH:mm")}`}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MessageSelf;
