import { Router } from "express";
import {
  postController,
  videoUpload,
  allVideos,
} from "../controller/PostController.js";
import { upload } from "../middleware/UploadFile.js";
import UserAuth from "../middleware/UserAuth.js";

const postRoute = Router();

postRoute.post(
  "/upload",
  UserAuth,
  upload.array("post_image", 4),
  postController,
);

postRoute.post("/upload/video", UserAuth, upload.single("video"), videoUpload);
postRoute.get("/videos", UserAuth, allVideos);

export default postRoute;
