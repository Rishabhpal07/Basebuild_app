import React, { useEffect, useRef } from "react";
import { useChat } from "../context/chatcontext";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeleton/MessageSkeleton";
import { useAuth } from "../context/authcontext";
import { formatMessageTime } from "../lib/utils";

const ChatContainer: React.FC = () => {
  const { messages, getMessages,subscribeToMessage,unSubscribeFromMessage, isMessagesLoading, selectedUser } = useChat();
  const { user } = useAuth();
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!selectedUser?._id) return;
   
    getMessages(selectedUser._id);
    subscribeToMessage();
  
    // cleanup
    return () => {
      unSubscribeFromMessage();
    };
  }, [selectedUser?._id ,getMessages,]);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex flex-1 flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, idx) => {
          const isMine = message.senderId === user?._id;
          const isLast = idx === messages.length - 1;

          return (
            <div
              key={message._id}
              className={`chat ${isMine ? "chat-end" : "chat-start"}`}
              // attach ref only to the last message
              ref={isLast ? messageEndRef : null}
            >
              <div className="chat-image avatar">
                <div className="w-10 h-10 rounded-full border overflow-hidden">
                  <img
                    src={isMine ? user?.profileImage ?? "/fallback.png" : selectedUser?.profileImage ?? "/fallback.png"}
                    alt="profile pic"
                  />
                </div>
              </div>

              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              <div className="chat-bubble flex flex-col">
                {message.image && (
                  <img src={message.image} alt="Attachment" className="sm:max-w-[200px] rounded-md mb-2" />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
