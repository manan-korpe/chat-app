import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.config.js";
import fs from "fs";

//utils
import SuccessResponse from "../utils/successResponse.js";
import ErrorResponse from "../utils/errorResponse.js";

export async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    if (!username || !email || !password)
      return next(new ErrorResponse(406, "enter valid values"));

    const newuser = new User({
      username: username,
      email: email,
      password: password,
    });

    await newuser.save();

    const createdUser = await User.findById(newuser._id, {
      _id: 0,
      password: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    if (!createdUser) return next(new ErrorResponse(402, "try again"));

    new SuccessResponse(201, "register sucssefuly", createdUser).SendResponse(
      res
    );
  } catch (err) {
    return next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new ErrorResponse(406, "enter valid values"));

    const user = await User.findOne({ email: email });

    if (!user)
      return next(new ErrorResponse(401, "enter valid email and password"));

    if (!(await user.comparePassword(password)))
      return next(new ErrorResponse(406, "enter valid email and password"));

    const token = user.createToken();

    if (!token)
      return next(new ErrorResponse(501, "something want wrong try again"));

    res.cookie("api_key", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, //1day expire
    });
    new SuccessResponse(201, "login sucssefuly",user).SendResponse(res);
  } catch (err) {
    return next(err);
  }
}

export async function logout(req,res,next){
  try{
    const {api_key} = req.cookies;

    if(api_key)
      res.clearCookie("api_key");
    console.log("logout");
    res.status(200).json({message:"logout successful"});
  }catch(err){
    return next(err);
  }
}

export async function getUser(req, res, next) {
  try {
    if (!req.body.email)
      return next(new ErrorResponse(400, "Enter valid value"));

    const user = await User.findOne({
      email: req.body.email,
      _id: { $ne: req.user._id },
    });
    if (!user) return next(new ErrorResponse(400, "Enter valid value"));

    res.status(200).json({ message: "new contect added", user });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
}

export async function getAllUser(req, res, next) {
  try {
    const user = await User.find();
    res.status(201).json({ message: "new contect added", user });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
}

export async function addContect(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "enter valid value" });

    const friens = await User.findOne({ email: email }, { password: 0 });

    if (!friens) return res.status(400).json({ message: "email not find" });
    if (!req.user)
      return res.status(400).json({ message: "something want wrong" });

    const isExist = await User.findOne({
      _id: req.user._id,
      contects: { _id: friens._id },
    });

    if (isExist)
      return res.status(400).json({ message: "email already in contects" });
    // const user = await User.find({ _id: req.user._id }, { password: 0 });

    const updated_contects = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { contects: friens } },
      { new: true }
    ).populate("contects");
    if (!updated_contects)
      return res.status(400).json({ message: "something want wrong" });

    res.status(201).json({ message: "new contect added", data: friens });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
}

export async function removeContact(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "enter valid value" });

    const friens = await User.findOne({ email: email }, { password: 0 });

    if (!friens) return res.status(400).json({ message: "email not find" });

    const isExist = await User.findOne({ contects: { _id: friens._id } });
    if (!isExist)
      return res.status(400).json({ message: "email not in contects" });

    const removedFriedDocument = await User.findOneAndUpdate(
      { $and: [{ contects: { _id: friens._id } }, { _id: req.user._id }] },
      { $pull: { contects: friens._id } },
      { new: true }
    );
    
    if (removedFriedDocument.modifiedCount <= 0)
      return res.status(400).json({ message: "Document not updated" });

    res.status(201).json({ message: "contact removed", removedFriedDocument });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
}

export async function uploadProfile(req,res,next){
  try{
    if(!req.file)
      return res.status(400).json({messagse:"file not found"});

    const result = await cloudinary.uploader.upload(req.file.path,{resource_type:'auto'});
    console.log(result.secure_url)
    if(!result.secure_url){
      return res.status(400).json({messagse:"file not uploaded"});
    }

    const updatedProfile = await User.findByIdAndUpdate(req.user._id, {$set:{profile:result.secure_url}});
    fs.unlink(req.file.path,(err)=>{
      if(err){
        return  res.status(400).json({messagse:"file not uploaded"});
      }
      console.log("deleted");
    });

    if(!updatedProfile)
     return res.status(400).json({messagse:"user not found try again"});

    res.status(200).json({isError:false,messgae:"file uploaded"});
  }catch(err){
    console.log(err)
    res.status(500).json({messagse:"internal server error"});
  }
}