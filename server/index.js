import { fileURLToPath } from "url";
import express from "express";
import http from "http";
import path from "path";

//path for es version
const __filename = fileURLToPath(import.meta.url); //get path of index.js file
const __dirname = path.dirname(__filename); //get base path of index.js file

const app = express();
const server = http.createServer(app);
app.use(express.static(path.join(__dirname, "public")));

//websocket
import { Server } from "socket.io";

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["POST", "GET"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.send("wokring");
});

const userSpace = io.of("/user");

userSpace.use((socket,next)=>{
  console.log(socket.handshake.query)
});

userSpace.on("connection",(socket)=>{
  console.log("connected nameSpace")
})

io.on("connection", (socket) => {
  console.log("webSocket connected");

  socket.on("message", (msg) => {
    console.log(io.sockets.adapter.rooms)
    console.log("receive message :- ", msg);
    socket.broadcast.emit("message", msg);
  });

  socket.on("send-to", (obj) => {
    console.log(io.sockets.adapter.rooms)
    socket.to(obj.to).emit("message to", obj.message);
  });

  socket.on("join-room",(room)=>{
    socket.join(room);
    console.log("room join",room);
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

server.listen(3000, () => {
  console.log("working good : " + "http://localhost:3000");
});
