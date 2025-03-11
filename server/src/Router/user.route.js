import {Router} from "express";
import {register, login, logout, getUser, getAllUser, addContect, removeContact, uploadProfile} from "../controllers/user.js";

import upload from "../config/multer.config.js";

//utils
import auth,{authenticate}  from "../utils/authenticate.js";

const route = Router();

route.get("/authenticate",authenticate);
route.post("/register",register);
route.post("/login",login);
route.get("/logout",logout);
route.post("/updateprofile",auth,upload.single("file"),uploadProfile);
route.get("/getalluser",getAllUser);
route.post("/getuser",auth,getUser);
route.post("/addcontect",auth,addContect)
route.patch("/removecontact",auth,removeContact)


export default route