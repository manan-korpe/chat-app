import { useState, useEffect, useContext, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { HistoryMessage, SendMessage } from "../api/message.api.js";
import { UserContext } from "../contexts/Usercontext.jsx";
import { SocketContext } from "../contexts/SocketContext.jsx";
import { IoSettings } from "react-icons/io5";
import { IoSend } from "react-icons/io5";
export default function Message({ image }) {
  const container = useRef();
  const { id } = useParams();
  const { contacts, active } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const reciverUser = contacts.find((val, i) => val._id == id);

  console.log(active.includes(id));
  useEffect(() => {
    if (container.current) {
      container.current.scrollTop = container.current.scrollHeight;
    }
  }, [history]);

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

  useEffect(() => {
    getMessageHistory.mutate(id);

    //socket event function
    function NewMeaageSocket(data) {
      console.log(data.senderId, id);
      if (data.senderId === id) {
        setHistory((pre) => {
          return [...pre, data];
        });
      }
    }

    //check socket is exits and trigger event
    if (socket) {
      socket.on("newMessage", NewMeaageSocket);
    }

    //remove event with pass event function for not generate multiple event
    return () => {
      if (socket) {
        socket.off("newMessage", NewMeaageSocket);
      }
    };
  }, [id, socket]);

  function SendMeaage(e) {
    e.preventDefault();
    sendMessage.mutate({ id, message });
  }

  return (
    <div className="col-7 col-md-9">
      <div className="text-white bg-light ">
        <nav className="nav align-items-center bg-primary p-2 rounded-bottom">
          <div
            className="position-relative nav-item bg-info rounded-circle  "
            style={{ width: "2.5rem", height: "2.5rem" }}
          >
            <img src={reciverUser?.profile || "#"} className="text-center" alt="m" ></img>
            <div
              className={`position-absolute top-0 end-0  rounded-circle border border-2 ${
                active.includes(id) ? "bg-success" : "bg-danger"
              }`}
              style={{ height: ".8rem", width: ".8rem" }}
            ></div>
          </div>
          <div className=" nav-item ms-4">
            <h6 className="fs-5 m-0">
              {reciverUser?.username || "Not Found"}{" "}
            </h6>
          </div>
          <Link className="text-white fs-4 ms-auto me-4" to="">
            <IoSettings />
          </Link>
        </nav>
        <div
          ref={container}
          className="rounded-3 px-2 my-2 overflow-auto message"
          style={{ height: "73vh" }}
        >
          <ul className=" w-100" style={{ listStyleType: "none" }}>
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
        <form onSubmit={SendMeaage} className="p-2  rounded ">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></input>
            <button className="btn input-gorup-text btn-primary">
              <IoSend />
            </button>
          </div>
        </form>
      </div>
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
