import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { io, Socket } from "socket.io-client";
import { axiosInstance } from "../lib/axios";

interface User {
  _id: string;
  name: string;
  email: string;
  college: string;
  city: string;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    githubUrl: string;
  }>;
  bio: string;
  profileImage: string;
  techStack: string[];
  hackathonInterests: string[];
  role: string;
  gender: string;
  experience: number;
  githubProfile: string;
  linkedinProfile: string;
  createdAt: string;
  isConnected:boolean
}

interface AuthContextType {
  user: User | null;
  userId: string;
  users: User[];
  otherUser: User | null;
  onlineUsers: string[];
  token: string | null;
  isAuthenticated: boolean;
  isUpdatedProfilePic: boolean;
  socket: Socket | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  updateProfilePic: (formData: FormData) => Promise<void>;
  fetchAllUsers:()=>void
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3002" : "/";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const [isUpdatedProfilePic, setIsUpdatedProfilePic] =
    useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [otherUser] = useState<User | null>(null);

  const socketRef = useRef<Socket | null>(null);

  const userId = user?._id || "";

  const connectSocket = useCallback(() => {
    if (!user) return;
    if (socketRef.current) return;

    const newSocket = io(BASE_URL, {
      query: { userId: user._id },
      // transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("connect_error", (err) => {
      console.error("Socket connect error:", err.message);
    });

    newSocket.on("disconnect", () => {
      console.warn("⚠️ Socket disconnected");
    });

    newSocket.on("getOnlineUsers", (userids: string[]) => {
      setOnlineUsers(userids);
    });

    socketRef.current = newSocket;
    setSocket(newSocket);
  }, [user]);
  const disconnectSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      console.log("❌ Socket disconnected");
      socketRef.current = null;
      setSocket(null);
      setOnlineUsers([]);
    }
  }, []);
  useEffect(() => {
    if (user) {
      connectSocket();
    } else {
      disconnectSocket();
    }
    return () => disconnectSocket();
  }, [user, connectSocket, disconnectSocket]);

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const fetchUser = async () => {
        try {
          const response = await axiosInstance.get(
            "/user/profile"
          );
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user on load", error);
          logout();
        }
      };
      if (!user) fetchUser();
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
  }, [token, user]);

  const login = async (email: string, password: string) => {
    const response = await axiosInstance.post(
      "/auth/login",
      { email, password }
    );
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
    setIsAuthenticated(true);
    connectSocket();
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    const response = await axiosInstance.post(
      "/auth/register",
      userData
    );
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
    setIsAuthenticated(true);
    connectSocket();
  };

  const updateProfilePic = async (formData: FormData) => {
    setIsUpdatedProfilePic(true);
    try {
      const response = await axiosInstance.post(
        "/user/updateProfilePic",
        formData
      );
      setUser((prevUser) =>
        prevUser ? { ...prevUser, ...response.data } : response.data
      );
      connectSocket();
    } finally {
      setIsUpdatedProfilePic(false);
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    const response = await axiosInstance.patch(
      "/user/updateProfile",
      userData
    );
    setUser(response.data);
  };
  const fetchAllUsers = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/user/matches");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  // ✅ call it on mount
  useEffect(() => {
    if (token) {
      fetchAllUsers();
    }
  }, [token,fetchAllUsers]);


  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    disconnectSocket();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        userId,
        otherUser,
        onlineUsers,
        token,
        isAuthenticated,
        isUpdatedProfilePic,
        socket,
        fetchAllUsers,
        login,
        register,
        logout,
        updateProfile,
        updateProfilePic,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
