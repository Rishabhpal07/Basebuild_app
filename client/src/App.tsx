import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/authcontext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import FinderSection from "./pages/FinderSection";
import ProfilePage from "./pages/Profile";
import Profile from "./pages/UpdateProfile";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import { ChatProvider } from "./context/chatcontext";
import OtherUserProfile from "./pages/OtherUserProfile";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};
const AppContent: React.FC = () => {
  const { onlineUsers } = useAuth();
  console.log("Online users:", onlineUsers);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-base-300">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<FinderSection />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="OtherProfile/:id"element={<OtherUserProfile/>}/>
            <Route
              path="/updateProfile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ChatProvider>
        <AppContent /> {/* ✅ context is ready here */}
      </ChatProvider>
    </AuthProvider>
  );
};

export default App;
