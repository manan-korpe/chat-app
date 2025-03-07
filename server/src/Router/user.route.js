import {Router} from "express";
import {register, login, getUser, getAllUser, addContect, removeContact} from "../controllers/user.js";

//utils
import auth,{authenticate}  from "../utils/authenticate.js";

const route = Router();

route.get("/authenticate",authenticate);
route.post("/register",register);
route.post("/login",login);
route.get("/getalluser",getAllUser)
route.post("/getuser",auth,getUser);
route.post("/addcontect",auth,addContect)
route.patch("/removecontact",auth,removeContact)


export default route