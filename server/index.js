import express from "express";
import "dotenv/config";
import cookieparser from "cookie-parser";
import cors from "cors";
import {app,server} from "./src/config/webSocket.config.js";

//configs
import dbConnect from "./src/config/db.config.js";
//routes
import userRoute from "./src/Router/user.route.js";
import messageRoute from "./src/Router/message.route.js";
//middlerware
app.use(express.json());
app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true
}));
app.use(cookieparser());

//router
app.use("/api/user/",userRoute);
app.use("/api/message",messageRoute);

app.use((err,req,res,next)=>{
  if(err)
    res.status(err.status || 500).json({messae:err.message});    
});

dbConnect().then(()=>{
  server.listen(3000,()=>{
    console.log("working good "+"http://localhost:3000");
  });
}).catch(err=>console.log(err.message))