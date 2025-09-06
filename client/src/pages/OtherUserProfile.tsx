import React from "react";
 import { useAuth } from "../context/authcontext";
import { Bot, Brain, Github, LinkedinIcon, LocationEditIcon, Mars, NotebookPen, Search, Star, User, Venus } from "lucide-react";
import { useParams } from "react-router-dom";

const OtherUserProfile: React.FC = () => {
    const {id}=useParams();
    const {users}=useAuth();
    const otherUser=users.find((u)=>u._id===id);
    return (
        <div className="h-full">
          <div className="max-w-2xl mx-auto p-4 py-8 ">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">profile information</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
               src={ otherUser?.profileImage}
                alt=""
                className="size-40 rounded-full object-cover border-4 "
              />
            </div>
             <div>
              {otherUser?.gender=="male" && <Mars/>}
              {otherUser?.gender=="female" && <Venus/>}
             </div>

            </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{otherUser?.name}</p>
            </div>

            <div className="space-y-3.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
               <NotebookPen className="w-4 h-4"/>
                bio
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{otherUser?.bio}</p>
            </div>

            <div className="space-y-3.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                 <Brain className="w-4 h-4"/>
                skills
              </div>
               <div className="flex flex-wrap gap-1 px-4 py-2.5 bg-base-200 rounded-lg border">
                {otherUser?.skills.map((skill,index)=>(
                  <span key={index} className="px-3 py-1 bg-base-200 rounded-full text-sm" >
                    {skill}
                  </span>
                ))}
               </div>
            </div>

            <div className="space-y-3.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                 <Bot className="w-4 h-4"/>
                techStack
              </div>
               <div className="flex flex-wrap gap-1 px-4 py-2.5 bg-base-200 rounded-lg border">
                {otherUser?.techStack.map((techStack,index)=>(
                  <span key={index} className="px-3 py-1 bg-base-200 rounded-full text-sm" >
                    {techStack}
                  </span>
                ))}
               </div>
            </div>

            <div className="space-y-3.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                 <Star className="w-4 h-4"/>
                experience
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{otherUser?.experience}</p>
            </div>

            <div className="space-y-3.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                 <Search className="w-4 h-4"/>
                lookingfor
              </div>
               <div className="flex flex-wrap gap-1 px-4 py-2.5 bg-base-200 rounded-lg border">
                {otherUser?.hackathonInterests.map((hackathonInterests,index)=>(
                  <span key={index} className="px-3 py-1 bg-base-200 rounded-full text-sm" >
                    {hackathonInterests}
                  </span>
                ))}
               </div>
            </div>

            <div className="space-y-3.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                 <LinkedinIcon className="w-4 h-4"/>
                LinkedIn profile
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{otherUser?.linkedinProfile}</p>
            </div>

            <div className="space-y-3.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                 <Github className="w-4 h-4"/>
                githubProfile
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{otherUser?.githubProfile}</p>
            </div>

            <div className="space-y-3.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                 <LocationEditIcon className="w-4 h-4"/>
                city
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{otherUser?.city}</p>
            </div>


          </div>
          
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{otherUser?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      );
    };
    export default OtherUserProfile;

