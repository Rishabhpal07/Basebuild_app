import React, { useState } from "react";
import { useAuth } from "../context/authcontext";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

interface CardProp {
  name?: string;
  userId: string;
  bio?: string;
  lookingfor?: string;
  image?: string;
  gender?: string;
  children?: React.ReactNode;
  isConnected?: boolean;
}

const Card: React.FC<CardProp> = ({
  name,
  userId,
  bio,
  lookingfor,
  image,
  gender,
  children,
  isConnected: initialConnected,
}) => {
  const { onlineUsers, token, fetchAllUsers } = useAuth();
  const isOnline = onlineUsers.includes(userId);
  const [isConnected, setIsConnected] = useState(initialConnected ?? false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/OtherProfile/${userId}`);
  };

  const handleConnect = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `/user/connect/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data?.isConnected !== undefined) {
        setIsConnected(response.data.isConnected);
      }
      fetchAllUsers(); // refresh context users
    } catch (error) {
      console.error("Error connecting:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-sm bg-base-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      <div className="p-4 flex gap-4 items-center">
        <div className="relative">
          {image && (
            <img
              src={image}
              alt={name || "User"}
              className="w-36 h-36 rounded-full object-cover"
              onClick={handleProfileClick}
            />
          )}
          {isOnline && (
            <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full ring-2 ring-white" />
          )}
        </div>

        <div className="flex flex-col">
          {gender && <h2 className="text-lg font-semibold text-gray-300">{gender}</h2>}
          {name && <h2 className="text-xl font-bold text-white">{name}</h2>}
          {bio && <p className="text-gray-400">{bio}</p>}
          {lookingfor && <p className="text-gray-500">{lookingfor}</p>}

          <button
            className={`mt-2 px-3 py-1 rounded-md ${
              isConnected
                ? "bg-green-500 text-white cursor-default"
                : "bg-white text-black hover:bg-gray-200"
            }`}
            onClick={handleConnect}
            disabled={loading}
          >
            {loading
              ? "Connecting..."
              : isConnected
              ? "Connected"
              : "Connect"}
          </button>
        </div>
      </div>

      {children && <div className="p-4">{children}</div>}
    </div>
  );
};

export default Card;
