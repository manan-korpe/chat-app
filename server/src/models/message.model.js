import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Types.ObjectId,
        requied:true
    },
    reciverId:{
        type:mongoose.Types.ObjectId,
        requied:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true});

const messages = mongoose.model("messages",messageSchema);
export default messages;
