const jwt=require("jsonwebtoken");
const User = require("../model/user");

async function usermiddleware(req,res,next) {
    const authHeader = req.header("Authorization") || req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
       const decode=jwt.verify(token,process.env.JWT_SECRET) 
       const decodedId=await User.findById(decode.id)
       if(!decodedId){
        return res.status(404).json({ message: "User not found" });
       }
       req.user=decodedId;
       next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(403).json({ message: "Invalid or expired token" });  
    }
}

module.exports={
    usermiddleware
}