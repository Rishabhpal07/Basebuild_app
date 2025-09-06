const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors");
const { server,app } = require("./lib/socket.io");
require('dotenv').config();

const path=require("path")

 app.use(express.json());
 app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);
const __dirname = path.resolve();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/message',require('./routes/message'))

if(process.env.NODE_ENV==="production" ){
  app.use (express.static(path.join(__dirname, "../client/dist")));

 app.get ("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client","dist", "index.html"))
});
}

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(" Connected to MongoDB");

    server.listen(3002, () => {
      console.log("Server running on port 3002");
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

main();
