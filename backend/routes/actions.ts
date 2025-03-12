import { Router } from "express";
import userController from "../controllers/userController";
import messageController from "../controllers/actionController";
import { messageValidator } from "./validators/messageValidators";

const router = Router();

router.post(
  "/createMessage",
  messageValidator,
  userController.verifyToken,
  messageController.sendMessage
);

router.post(
  "/likeMessage",
  userController.verifyToken,
  messageController.likeMessage
);

router.delete(
  "/unLikeMessage",
  userController.verifyToken,
  messageController.unLikeMessage
);

router.post(
  "/addFriend",
  userController.verifyToken,
  messageController.addFriend
);

router.delete(
  "/removeFriend",
  userController.verifyToken,
  messageController.deleteFriend
);

router.post(
  "/joinGroup",
  userController.verifyToken,
  messageController.joinGroup
);

router.delete(
  "/leaveGroup",
  userController.verifyToken,
  messageController.leaveGroup
);

router.delete(
  "/deleteGroup",
  userController.verifyToken,
  messageController.deleteGroup
);

export default router;
