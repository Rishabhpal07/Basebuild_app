const express = require("express");
const { usermiddleware } = require("../midleware/authMiddle");
const { Message } = require("../model/message");
const User = require("../model/user");
const cloudinary = require("../lib/cloudinary");
const upload = require("../midleware/upload");
const fs=require("fs");
const { getRecieverSocketId, io } = require("../lib/socket.io");

const router = express.Router();

router.get("/fetchMessageUser",usermiddleware,async (req,res)=>{
  try {
  const myId= req.user._id;
   const user=await User.findById(myId);
   //console.log(user);
   if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
    const connectionsId=user.connections;
       const connectionDetails=await User.find({_id:{$in:connectionsId}},"name profileImage email ");
       res.status(200).json(connectionDetails);
  } catch (error) {
    console.error("Error in getting message:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
})
router.get("/fetchMessage/:id", usermiddleware, async (req, res) => {
  try {
    const { id: userToChat } = req.params;
    const myId = req.user._id;

    const message = await Message.find({
      $or: [
        { senderId: myId, recieverId: userToChat },
        { senderId: userToChat, recieverId: myId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(message);
  } catch (error) {
    console.error("Error in getting message:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/sendMessage/:id", usermiddleware, async (req, res) => {
  try {
    const { image, text } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;
    // console.log("senderId",senderId,"","recieverid",recieverId)
    let imageUrl = null;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image,{
        folder: "profile_pics",
            resource_type:"auto"
      });
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      text,
      image: imageUrl,
    });
   
    await newMessage.save();

    const receiverSocketId=getRecieverSocketId(recieverId)
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage",newMessage)
      console.log("message emit succesfully")
    }
    else{
      console.log("uncessful message emiy")
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sending message:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
