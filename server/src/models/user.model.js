import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    profile:{
        type:String
    },
    email:{
        type:String,
        required:true,
        immutable:true
    },
    token:{
        type:String,
        default:""
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps: true});

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.createToken = function(){
    console.log(process.env.JWT_KEY)
    return jwt.sign({email:this.email},process.env.JWT_KEY,{
        expiresIn:"1d"
    })
}
userSchema.methods.compareToken = function(token){
   return jwt.verify(token,process.env.JWT_KEY);
}
 const users = mongoose.model("users",userSchema);
export default users;