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
  FrogetPassword,
  AllPost,
  userFind,
  ProfileController,
  CurrentUser,
} from "../controller/UserController.js";
import UserAuth from "../middleware/UserAuth.js";
// import { upload } from "../middleware/UploadFile.js";
import { upload } from "../controller/UserController.js";

const user_Router = Router();

user_Router.post("/login", userLogin);
user_Router.post(
  "/registration",
  upload.single("profile_image"), //middleware upload an images
  userRegistration,
);

// user_Router.get("/curr/user", CurrentUser);

user_Router.post("/login/user", userFind);
user_Router.patch("/forget_password", FrogetPassword);
user_Router.post("/post", UserAuth, userPost);
user_Router.post("/allpost", userAllPost);
user_Router.get("/all/post", AllPost);
user_Router.patch("/update/:id", updateDataPost);

user_Router.get("/allusers", UserAuth, User_lists);
user_Router.patch("/edit/profile", UserAuth, ProfileController);

//public access
user_Router.patch("/like/id", UserAuth, update_like);
user_Router.patch("/comment/id", UserAuth, add_Comment);

export default user_Router;
