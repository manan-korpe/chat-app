import Axios from "./index.js";

export async function isAuthenticate(){
    const response = await Axios.get("/authenticate");
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
