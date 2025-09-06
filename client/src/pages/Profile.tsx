import { useState } from "react";
import { useAuth } from "../context/authcontext";
import { Bot, Brain, Camera, Github, Linkedin, LocationEditIcon, Mars, NotebookPen, Search, Star, User, UserPen, Venus } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, isUpdatedProfilePic, updateProfilePic } = useAuth();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>)=> {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSelectedImg(reader.result as string);
    };
    const formData = new FormData();
    formData.append('profileImage', file); 
    await updateProfilePic(formData);
    setSelectedImg(null);
  };

  return (
    <div className="h-full">
      <div>
       <UserPen className="text-white"  onClick={() => navigate("/updateProfile")} />
          </div>
      <div className="max-w-2xl mx-auto p-4 py-8 ">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
               src={selectedImg || user?.profileImage}
                alt=""
                className="size-40 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatedProfilePic ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatedProfilePic}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatedProfilePic ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
             <div>
              {user?.gender=="male" && <Mars/>}
              {user?.gender=="female" && <Venus/>}
             </div>

            </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{user?.name}</p>
            </div>

            <div className="space-y-3.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
               <NotebookPen className="w-4 h-4"/>
                bio
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{user?.bio}</p>
            </div>

            <div className="space-y-3.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                 <Brain className="w-4 h-4"/>
                skills
              </div>
               <div className="flex flex-wrap gap-1 px-4 py-2.5 bg-base-200 rounded-lg border">
                {user?.skills.map((skill,index)=>(
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
                {user?.techStack.map((techStack,index)=>(
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
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{user?.experience}</p>
            </div>

            <div className="space-y-3.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                 <Search className="w-4 h-4"/>
                lookingfor
              </div>
               <div className="flex flex-wrap gap-1 px-4 py-2.5 bg-base-200 rounded-lg border">
                {user?.hackathonInterests.map((hackathonInterests,index)=>(
                  <span key={index} className="px-3 py-1 bg-base-200 rounded-full text-sm" >
                    {hackathonInterests}
                  </span>
                ))}
               </div>
            </div>

            <div className="space-y-3.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                 <Linkedin className="w-4 h-4"/>
                LinkedIn profile
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{user?.linkedinProfile}</p>
            </div>

            <div className="space-y-3.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                 <Github className="w-4 h-4"/>
                githubProfile
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{user?.githubProfile}</p>
            </div>

            <div className="space-y-3.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                 <LocationEditIcon className="w-4 h-4"/>
                city
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{user?.city}</p>
            </div>


          </div>
          
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{user?.createdAt?.split("T")[0]}</span>
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
export default ProfilePage;