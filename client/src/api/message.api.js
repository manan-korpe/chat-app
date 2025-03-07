import Axios from "./index.js";

export async function HistoryMessage(id){
    return await Axios.get(`/api/message/historymessage/${id}`);
}

export async function SendMessage({id,message}){
    console.log(message)
    return await Axios.post(`/api/message/sendmessage/${id}`,{message},{
        headers:{
            "Content-Type":"application/json"
        }
    });
}