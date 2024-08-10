import React from "react";
import { useSelector } from "react-redux";
import MessageSelf from "./MessageSelf";
import MessageOther from "./MessageOther";

const MessagesContainer = ({ allMessages }) => {
    const { userData } = useSelector((state) => state.user);
    const userId = userData._id;
    return (
        <div className="w-full h-full flex flex-col-reverse shadow-c2 bg-white rounded-5xl customScroll p-5">
            {allMessages
                ? allMessages.map((message, index) =>
                      message.senderId === userId ? (
                          <MessageSelf key={index} message={message} />
                      ) : (
                          <MessageOther key={index} message={message} />
                      )
                  )
                : "No Messages Start Chatting"}
        </div>
    );
};

export default MessagesContainer;
