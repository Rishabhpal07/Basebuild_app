import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useAuth } from "./authcontext";
import { axiosInstance } from "../lib/axios";
export interface Message {
  _id: string;
  text: string;
  image:string;
  senderId: string;
  receiverId: string;
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  profileImage:string;
}

interface ChatContextType {
  messages: Message[];
  users: User[];
  selectedUser: User;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (messageData: { text: string ,image?: string | null; 
  }) => Promise<void>;
  setSelectedUser: (user: User | null) => void;
  subscribeToMessage:()=>void;
  unSubscribeFromMessage:()=>void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
   const {socket}=useAuth();
 
  // ✅ Fetch users
  const getUsers = useCallback(async () => {
    setIsUsersLoading(true);
    try {
      const response = await axiosInstance.get<User[]>("/message/fetchMessageUser");
      console.log(response.data)
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setIsUsersLoading(false);
    }
  }, []);

  
  const getMessages = useCallback(async (userId: string) => {
    setIsMessagesLoading(true);
    try {
      const response = await axiosInstance.get<Message[]>(
        `/message/fetchMessage/${userId}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Failed to fetch messages", error);
    } finally {
      setIsMessagesLoading(false);
    }
  }, []);

  const sendMessage = useCallback(
    async (messageData: { text: string;image?: string|null }) => {
      if (!selectedUser) return;
      try {
        const response = await axiosInstance.post<Message>(
          `/message/sendMessage/${selectedUser._id}`,
          messageData
        );
        setMessages((prev) => [...prev, response.data]);
      } catch (error) {
        console.error("Failed to send message", error);
      }
    },
    [selectedUser]
  );

  const subscribeToMessage=()=>{
    if(!selectedUser)return 
    socket?.off("newMessage")
     socket?.on("newMessage",(
      newMessage:Message
     )=>{
      const isMessageRelevant =
      newMessage.senderId === selectedUser._id ||
      newMessage.receiverId === selectedUser._id;
    if (!isMessageRelevant) return;    
      console.log("socket event recieve a message",newMessage)
      setMessages((prev)=>[...prev,newMessage])
     })
  }

  const unSubscribeFromMessage=()=>{
    socket?.off("newMessage")
  }
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        users,
        //@ts-ignore
        selectedUser,
        isUsersLoading,
        isMessagesLoading,
        subscribeToMessage,
        unSubscribeFromMessage,
        getUsers,
        getMessages,
        sendMessage,
        setSelectedUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return context;
};
