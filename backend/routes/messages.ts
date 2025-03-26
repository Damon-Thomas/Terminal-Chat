import { Router } from "express";
import userController from "../controllers/userController.js";
import messageController from "../controllers/messageController.js";

const router = Router();

router.post(
  "/getMessagesBetweenUsers",
  userController.verifyToken,
  userController.authUser,
  messageController.getMessagesBetweenUsers
);

router.post(
  "/getMessagesToGroup",
  userController.verifyToken,
  userController.authUser,
  messageController.getMessagesToGroup
);

export default router;
