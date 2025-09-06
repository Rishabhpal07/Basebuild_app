import { useEffect, } from "react";

import { Users } from "lucide-react";
import { useChat } from "../context/chatcontext";
import SidebarSkeleton from "./skeleton/SidebarSkeleton";
import { useAuth } from "../context/authcontext";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChat();
  //@ts-ignore
   const {onlineUsers}=useAuth()
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;
    

  return (
    <aside className="h-full w-full lg:w-72 border-r border-base-200 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-72 p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium">Contacts</span>
        </div>
        </div>

      <div className="overflow-y-auto w-full py-3">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-[#EFF5D2] transition-colors duration-200 cursor-pointer hover:shadow-sm 
              ${selectedUser?._id === user._id ? "bg-white ring-1 ring-base-300" : ""}
            `}
          > 
            <div className=" ">
              <img
                src={user.profileImage}
                alt={user.name}
                className="size-12 text-left object-cover rounded-full"
              />
              
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>
            <div className=" text-left min-w-0">
              <div className="font-medium truncate">{user.name}</div>
              <div className="text-sm text-base-100">
                 {onlineUsers.includes(user._id) ? "Online" : "Offline"} 
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};
export default Sidebar;
