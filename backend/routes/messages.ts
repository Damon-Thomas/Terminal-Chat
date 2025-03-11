import { Router } from "express";
import userController from "../controllers/userController";
import messageController from "../controllers/messageController";
import { messageValidator } from "./validators/messageValidators";

const router = Router();

router.post(
  "/createMessage",
  messageValidator,
  userController.verifyToken,
  messageController.sendMessage
);

export default router;
