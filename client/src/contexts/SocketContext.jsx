import { createContext, useState, useEffect, useContext } from "react";
import {UserContext} from "../contexts/Usercontext.jsx";

import {io} from "socket.io-client";

export const SocketContext = createContext();

export default function SocketContextProvider({ children }) {
  const {id, setActive} = useContext(UserContext);
  const [socket, setSocket] = useState("");

  function SocketConnection() {
    const tempsocket = io(import.meta.env.VITE_API_BASE_URL,{
      query:{
        userId:id
      }
    });
    setSocket(tempsocket);
  }

  useEffect(() => {
    if (socket) {
      console.log(socket);
      socket.on("connect", () => {
        console.log("socket connected");
        
        socket.on("activeStatus",(data)=>{
          setActive(data);
        });

        socket.on("disconnect", () => {
          console.log("disconnected");
        });
      });
    }

    ()=>socket.disconnect();
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket,SocketConnection }}>
      {children}
    </SocketContext.Provider>
  );
}
