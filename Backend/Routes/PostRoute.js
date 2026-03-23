import { Router } from "express";
import { postController } from "../controller/PostController.js";
import multer from "multer";
import { upload } from "../middleware/UploadFile.js";
import UserAuth from "../middleware/UserAuth.js";

const postRoute = Router();

postRoute.post("/", (req, res) => {
  console.log("post Route Running..");
});

postRoute.post(
  "/upload",
  UserAuth,
  upload.array("post_image", 4),
  postController,
);

export default postRoute;
