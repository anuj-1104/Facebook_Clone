import jwt from "jsonwebtoken";
import { User } from "../model/User_Model.js";

const userAuthMiddleware = async (req, res, next) => {
  try {
    const header_token = req.header("Authorization");

    if (!header_token || !header_token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = header_token.replace("Bearer ", "");

    const decode = jwt.decode(token, process.env.SECRET_KEY);

    const user = await User.findById(decode.id).select("-password");
    if (!user) {
      res.status(401).json({ message: "user Not Found" });
    }

    req.user = String(user._id);
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error " });
  }
};

export default userAuthMiddleware;
