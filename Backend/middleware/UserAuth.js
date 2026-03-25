import jwt from "jsonwebtoken";
import { User } from "../model/User_Model.js";
import dotenv from "dotenv";

dotenv.config();

const userAuthMiddleware = async (req, res, next) => {
  try {
    const header_token = req.header("Authorization");

    if (!header_token || !header_token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    // console.log("run auth");
    const token = header_token.replace("Bearer ", "");
    // console.log(token);
    const decode = jwt.decode(token, process.env.SECRET_KEY);
    // console.log(req.header("Authorization"));

    const user = await User.findById(decode.id).select("-password");
    if (!user) {
      res.status(401).json({ message: "user Not Found" });
    }

    req.user = user;
    // console.log("ending");
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error " });
  }
};

export default userAuthMiddleware;
