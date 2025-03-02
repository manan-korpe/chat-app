import User from "../models/user.model.js";

//utils
import SuccessResponse from "../utils/successResponse.js";
import ErrorResponse from "../utils/errorResponse.js";


export async function register(req,res,next){
    try{
        const {username,email,password} = req.body;
        console.log(username,email,password)
        if(!username || !email || !password)
           return next(new ErrorResponse(406,"enter valid values"));
            
        const newuser = new User({username:username,email:email,password:password});

        await newuser.save();

        const createdUser = await User.findById(newuser._id,{_id:0,password:0,createdAt:0,updatedAt:0});

        if(!createdUser)
            return next(new ErrorResponse(402,"try again"));

        new SuccessResponse(201,"register sucssefuly",createdUser).SendResponse(res);
    }catch(err){
        console.log(err)
        return next(err);
    }
}

export async function login(req,res,next){
    try{
        const {email,password} = req.body;

        if(!email || !password)
            return next(new ErrorResponse(406,"enter valid values"));
    
        const user = await User.findOne({email:email});
        
        if(!user)
            return next(new ErrorResponse(401,"enter valid email and password"));

        if(!await user.comparePassword(password))
            return next(new ErrorResponse(406,"enter valid email and password"));

        const token = user.createToken();

        if(!token)
            return next(new ErrorResponse(501,"something want wrong try again"));

        res.cookie("api_key",token,{
            httpOnly:true,
            maxAge:24*60*60*1000, //1day expire
        });

        new SuccessResponse(201,"login sucssefuly").SendResponse(res);
    }catch(err){
        console.log(err)
        return next(err);
    }
} 

