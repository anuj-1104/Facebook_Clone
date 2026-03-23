import { Router } from "express";
import {
  friendsRequest,
  friNotification,
  requestconform,
  requestController,
} from "../controller/FriendsController.js";
import userAuthMiddleware from "../middleware/UserAuth.js";

const FriendsRoutes = Router();

FriendsRoutes.get("/friend/allrequest", requestController);
FriendsRoutes.post("/friend/request", userAuthMiddleware, friendsRequest);
FriendsRoutes.get("/friend/notification", friNotification);
FriendsRoutes.post("/friend/confirmreq", requestconform);

export default FriendsRoutes;
