import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import Sidebar from "../components/Sidebar";
import { useChat } from "../context/chatcontext";

const Chat = () => {
  const { selectedUser, setSelectedUser } = useChat();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-2">
        <div className="bg-white rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">

            <div
              className={`
                bg-[#A8BBA3] h-full w-full text-base-100
                 lg:w-72 
                transition-transform duration-300
                ${selectedUser ? "hidden md:block" : "block"}
              `}
            >
              <Sidebar />
            </div>

            <div
              className={`
                flex-1 bg-base-100 h-full
                ${!selectedUser ? "hidden md:flex" : "flex"}
              `}
            >
              {!selectedUser ? (
                <NoChatSelected />
              ) : (
                <div className="w-full h-full flex flex-col">
                  <div className="md:hidden p-2 bg-base-100 text-white">
                    <button onClick={() => setSelectedUser(null)}>← Back</button>
                  </div>
                  <ChatContainer />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
