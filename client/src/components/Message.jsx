import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { HistoryMessage, SendMessage } from "../api/message.api.js";
import { UserContext } from "../contexts/Usercontext.jsx";
import { SocketContext } from "../contexts/SocketContext.jsx";

export default function Message({ image}) {
  const container =useRef();
  const { id } = useParams();
  const { contacts,active } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const reciverUser = contacts.find((val, i) => val._id == id);
  console.log(active.includes(id))
  useEffect(()=>{
    if(container.current){
     container.current.scrollTop = container.current.scrollHeight
    }
  },[history]);

  //get message history
  const getMessageHistory = useMutation({
    mutationFn: HistoryMessage,
    onSuccess: (res) => {
      // console.log(res.data.data)
      setHistory(res.data.data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  //sending message to reciver and push response message (goted from db) on history
  const sendMessage = useMutation({
    mutationFn: SendMessage,
    onSuccess: (res) => {
      setHistory((pre) => {
        return [...pre, res.data.data];
      });
      setMessage("");
      
    },
    onError: (err) => {
      console.log(err);
    },
  });
  
  useEffect(()=>{
    getMessageHistory.mutate(id);

    //socket event function
    function NewMeaageSocket(data){
      console.log(data.senderId, id)
      if (data.senderId === id) {
        setHistory((pre) => {
          return [...pre, data];
        });
      }
    }

    //check socket is exits and trigger event
    if (socket) {
      socket.on("newMessage",NewMeaageSocket);
    }

    //remove event with pass event function for not generate multiple event 
    return ()=>{
      if (socket) {
        socket.off("newMessage",NewMeaageSocket);
      }
      
    }
   
  },[id,socket]);

  function SendMeaage(e) {
    e.preventDefault();
    sendMessage.mutate({ id, message });
  }

  return (
    <div className="col-7 col-md-9 text-white ">
      <nav className="d-flex gap-4 align-items-center p-2 bg-secondary rounded-bottom-4">
        <div
          className="flex-shink-0 bg-info rounded-circle border border-2 border-success"
          style={{ width: "50px", height: "50px" }}
        >
          <img src={image} alt="dp"></img>
        </div>
        <div className="w-75">
          <h5 className="fs-5 m-0">{reciverUser.username} </h5>
          <small
            className={active.includes(id) ? "text-success fw-bold" : "text-danger"}
            style={{ letterSpacing: ".8px" }}
          >
            {active.includes(id) ? "online" : "offline"}
          </small>
        </div>
        <div className="badge bg-success ">100+</div>
      </nav>
      <div
      ref={container}
        className="rounded-3 px-2 my-2 overflow-auto message"
        style={{ height: "80vh" }}
      >
        <ul className=" w-100" style={{ listStyleType: "none" }} >
          {history.map((val, i) => (
            <Chat
              key={i}
              message={val.message}
              time={`${val.createdAt.split("T")[1].split(":")[0]}:${
                val.createdAt.split("T")[1].split(":")[1]
              }`}
              who={id == val.reciverId ? "me" : "you"}
            />
          ))}
        </ul>
      </div>
      <form onSubmit={SendMeaage} className="p-2 ">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
          <button className="btn input-gorup-text btn-success">Send</button>
        </div>
      </form>
    </div>
  );
}

function Chat({ who, message, time }) {
  return (
    <li
      className={`d-flex ${
        who === "me"
          ? "justify-content-end"
          : who === "you"
          ? "justify-content-start"
          : "justify-content-center"
      } px-2`}
    >
      <div
        className={`alert ${
          who === "me"
            ? "alert-info"
            : who === "you"
            ? "alert-danger"
            : "alert-warning rounded-5"
        } p-1 px-3 rounded-3`}
        style={{ maxWidth: "45%" }}
      >
        <div>
          {message}{" "}
          {time && (
            <small className="ms-2 " style={{ fontSize: ".6rem" }}>
              {time}
            </small>
          )}
        </div>
      </div>
    </li>
  );
}
