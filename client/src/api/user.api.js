import Axios from "./index.js";

export async function isAuthenticate(){
    const response = await Axios.get("/api/user/authenticate");
    return response;
}

export async function register(data) {
  const response = await Axios.post("/api/user/register", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

export async function login(data) {
  const response = await Axios.post("/api/user/login", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

export async function logOut() {
  const response = await Axios.get("/api/user/logout");
  return response;
}

export async function getUser(data) {
  const response = await Axios.post("/api/user/getuser",{email:data});
  return response
}

export async function addContact(data) {
  const response = await Axios.post("/api/user/addContect",{email:data});
  return response
}

export async function updateProfile(formdata){
  const response = await Axios.post("api/user/updateprofile",formdata,{
    headers:{
      "Content-Type":"multipart/form-data",
    }
  });

  return response
}