import { Router } from "express";
import {
  friendsRequest,
  friNotification,
} from "../controller/FriendsController.js";
import userAuthMiddleware from "../middleware/UserAuth.js";

const FrindsRoutes = Router();

FrindsRoutes.post("/friend/request", userAuthMiddleware, friendsRequest);
FrindsRoutes.get("/friend/notification", friNotification);

export default FrindsRoutes;
