import React, { useEffect } from "react";
import { useAuth } from "../context/authcontext";
import Card from "./card";


const Matches: React.FC = () => {
  const { users, fetchAllUsers } = useAuth();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  console.log("Users from context:", users);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {users.map((u) => (
        <Card
          key={u._id}
          userId={u._id}
          name={u.name}
          bio={u.bio}
          gender={u.gender}
          image={u.profileImage}
          lookingfor={u.role}
          isConnected={u.isConnected}
        />
      ))}
    </div>
  );
};

export default Matches;
