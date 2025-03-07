import {Server} from "socket.io";
import express from "express";
import http from "http";

export const app = express();
export const server = http.createServer(app);

const socketMap = {};

export const io = new Server(server,{
    cors:{
      origin:"http://localhost:5173"
    },
  });
  
  io.on("connection", (socket) => {
    console.log("conntected ", socket.id);

    const userId = socket.handshake.query.userId;
    if(userId != undefined) {
      socketMap[userId] = socket.id;
      io.emit("activeStatus",Object.keys(socketMap));
    };

    socket.on("disconnect",(err)=>{
        delete socketMap[userId];
        io.emit("activeStatus",Object.keys(socketMap));
        console.log("disconnected");
    });
  });


export function getReciverSocketId(dbID){
  console.log(socketMap)
  return socketMap[dbID];
}