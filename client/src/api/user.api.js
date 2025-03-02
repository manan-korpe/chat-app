import Axios from "./index.js";

export async function register(data){
        const resposne = await Axios.post("/register",data,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        return resposne
}
