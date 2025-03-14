import { Router } from "express";
import userController from "../controllers/userController";
import messageController from "../controllers/messageController";

const router = Router();

router.get(
  "/getMessagesBetweenUsers",
  userController.verifyToken,
  userController.authUser,
  messageController.getMessagesBetweenUsers
);

router.get(
  "/getMessagesToGroup",
  userController.verifyToken,
  userController.authUser,
  messageController.getMessagesToGroup
);

export default router;
