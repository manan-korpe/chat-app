import { fileURLToPath } from "url";
import express from "express";
import "dotenv/config";
import cookieparser from "cookie-parser";
import http from "http";
import path from "path";

//configs
import dbConnect from "./src/config/db.config.js";

//routes
import userRoute from "./src/Router/user.route.js";

const app = express();

//middlerware
app.use(express.json());
app.use(cookieparser());

//router
app.use(userRoute);

app.use((err,req,res,next)=>{
  if(err)
    res.status(err.status || 500).json({messae:err.message});    
});

dbConnect().then(()=>{
  app.listen(3000,()=>{
    console.log("working good"+"http://localhost:3000");
  });
}).catch(err=>console.log(err.message))