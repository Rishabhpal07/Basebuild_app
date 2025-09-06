import React from "react";
 import { useAuth } from "../context/authcontext";
import Card from "../components/card";
import { Mars, Venus } from "lucide-react";

const FinderSection: React.FC = () => {
  const {users ,user}=useAuth()  ;
  const otheruser=users.filter((u)=>u._id!=user?._id)
  return(
   <div className="p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
     {otheruser.map((user) => (
  <Card 
    key={user._id}
    userId={user._id}
    //@ts-ignore
    gender={user?.gender == "male" ? <Mars className="text-blue-400" /> : <Venus className="text-pink-400"/>}
    name={user.name}
    bio={user.bio}
    //@ts-ignore
    lookingfor={user.hackathonInterests}
    image={user.profileImage}
  >  
  </Card>
))}
  </div>
  )
}
export default FinderSection;

