import {Router} from "express";
import {contacts, sendMessage, historyMessage} from "../controllers/message.js";

//utils
import auth from "../utils/authenticate.js";

const route = Router();

route.get("/contacts",auth,contacts);
route.get("/historymessage/:id",auth,historyMessage);
route.post("/sendmessage/:id",auth,sendMessage);

export default route;
