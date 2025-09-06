import { X } from "lucide-react";
import { useChat } from "../context/chatcontext";
import { useAuth } from "../context/authcontext";

const ChatHeader = () => {
  const { selectedUser,setSelectedUser} = useChat();
  const { onlineUsers } = useAuth();

  console.log(selectedUser?.name);

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="pl-0.5 size-10 rounded-full relative">
              <img
                src={selectedUser?.profileImage}
                alt={selectedUser?.name}
              />
              {onlineUsers.includes(selectedUser?._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>
          </div>
          <div>
            <h3 className="font-medium">{selectedUser?.name}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser?._id)
                ? "Online"
                : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
