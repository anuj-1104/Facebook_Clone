import { Router } from "express";
import {
  userLogin,
  userRegistration,
  userPost,
  userAllPost,
  updateDataPost,
  update_like,
  add_Comment,
  User_lists,
  AllPost,
} from "../controller/UserController.js";
import UserAuth from "../middleware/UserAuth.js";
import { upload } from "../middleware/UploadFile.js";

const user_Router = Router();

user_Router.post("/login", userLogin);
user_Router.post(
  "/registration",
  upload.single("profile_image"), //middleware upload an images
  userRegistration,
);
user_Router.post("/post", UserAuth, userPost);
user_Router.post("/allpost", userAllPost);
user_Router.get("/all/post", AllPost);
user_Router.patch("/update/:id", updateDataPost);

user_Router.get("/allusers", UserAuth, User_lists);

//public access
user_Router.patch("/like/id", UserAuth, update_like);
user_Router.patch("/comment/:id", UserAuth, add_Comment);

export default user_Router;
