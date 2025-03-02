import mongoose from "mongoose";


async function dbConnect(){
    console.log(`${process.env.DB_URL}/${process.env.DB_NAME}`)
    try{
        await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);
    }catch(err){
        console.log(err.message);
    }
}

export default dbConnect