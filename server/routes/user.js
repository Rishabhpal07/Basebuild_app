const express=require("express");
const { usermiddleware } = require("../midleware/authMiddle");
const User = require("../model/user");
const upload = require("../midleware/upload");
const router=express.Router();
const cloudinary = require("../lib/cloudinary");
const fs=require("fs");
const { Message } = require("../model/message");


router.get("/profile",usermiddleware,async (req,res)=>{
    try {
        
        const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.getPublicProfile()); 
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error: error.message });   
    }
})

router.patch("/updateProfile",usermiddleware,async (req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates = [
        'name', 'college', 'city', 'skills', 'projects', 'bio',
        'techStack', 'hackathonInterests', 'role', 
        'githubProfile', 'linkedinProfile', 'profileImage','gender'
      ];
      const isValidOperation=updates.every(update=>allowedUpdates.includes(update))
      if (!isValidOperation) {
        return res.status(400).json({ message: 'Invalid updates' });
      }
      try {
        const user=req.user;
        updates.forEach(update=>user[update]=req.body[update]);
        await user.save();
        res.status(200).json(
            user.getPublicProfile()
        )
      } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
      }
})


router.get("/matches", usermiddleware, async (req, res) => {
  try {
    const me = req.user._id;
    const loggedInUser = await User.findById(me);

    const allUsers = await User.find({ _id: { $ne: me } }).select("-password");

    const usersWithStatus = allUsers.map(u => ({
      ...u.toObject(),
      isConnected: loggedInUser.connections.includes(u._id.toString())
    }));

    res.status(200).json(usersWithStatus);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ message: "Error fetching matches" });
  }
});




router.post("/connect/:id", usermiddleware, async (req, res) => {
  try {
    const me = req.user._id;
    const otherUser = req.params.id;

    if (me.toString() === otherUser) {
      return res.status(400).json({
        message: "You can't connect with yourself",
      });
    }

    const user = await User.findById(me);
    if (!user.connections.includes(otherUser)) {
      user.connections.push(otherUser);
      await user.save(); 
    }
    const user2 = await User.findById(otherUser);
    if (!user2.connections.includes(me)) {
      user2.connections.push(me);
      await user2.save(); 
    }
    const isConnected = user.connections.includes(otherUser);
    const isConnected2 = user2.connections.includes(me);

    return res.status(200).json({
      message: "User connected successfully",
      isConnected,
      isConnected2
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "There was an error while connecting with the user",
    });
  }
});

  router.post("/updateProfilePic",usermiddleware, upload.single("profileImage"),async (req, res) => {
      try {
        const userId = req.user._id;

        if (!req.file) {
          return res.status(400).json({ message: "No file uploaded" });
        }
        let uploadResponse;
        try {
          uploadResponse = await cloudinary.uploader.upload(req.file.path, {
            folder: "profile_pics",
            resource_type:"auto"
          }
        );
        } catch (err) {
          console.error("Cloudinary upload failed:", err);
          return res.status(500).json({ message: "Cloudinary upload failed" });
        }
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { profileImage: uploadResponse.secure_url },
          { new: true }
        );
        fs.unlink(req.file.path, (err) => {
          if (err) console.error("Failed to delete local file:", err);
        });
  
        res.status(200).json(updatedUser);
      } catch (error) {
        console.error("Error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  );
  
   
router.get("/connections",usermiddleware, async (req, res) => {
    try {
      const me = req.user._id;
      const user = await User.findById(me).populate("connections", "name email");
      res.json(user.connections);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/getOtherProfile/:id", usermiddleware, async (req,res) => {
    try {
      const Id = req.params.id;
      const response = await User.findById(Id);
      if(!response) return res.status(404).json({message: "User not found"}); // Add proper return
      res.status(200).json(response)
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  })
  
  module.exports = router;

