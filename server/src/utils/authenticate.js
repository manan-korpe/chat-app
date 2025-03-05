import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export async function authenticate(req, res) {
  const { api_key } = req.cookies;

  if (!api_key) {
    return res
      .status(401)
      .json({ isError: true, message: "unauthorized person" });
  }

  const data = jwt.verify(api_key, process.env.JWT_KEY);

  if (!data.email)
    return res
      .status(401)
      .json({ isError: true, message: "unauthorized person" });

  const user = await User.findOne({ email: data.email },{password:0});

  if (!user)
    return res
      .status(401)
      .json({ isError: true, message: "unauthorized person" });

  res.status(200).json({ isError: false, message: "authorized person" });
}

export default async function auth(req, res,next) {
    const { api_key } = req.cookies;
  
    if (!api_key) {
      return res
        .status(401)
        .json({ isError: true, message: "unauthorized person" });
    }
  
    const data = jwt.verify(api_key, process.env.JWT_KEY);
  
    if (!data.email)
      return res
        .status(401)
        .json({ isError: true, message: "unauthorized person" });
  
    const user = await User.findOne({ email: data.email },{password:0});
  
    if (!user)
      return res
        .status(401)
        .json({ isError: true, message: "unauthorized person" });
  
    req.user = user;

    next();
  }
