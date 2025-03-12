import { Router } from "express";
import userController from "../controllers/userController";
import messageController from "../controllers/actionController";
import { messageValidator } from "./validators/messageValidators";

const router = Router();

router.post(
  "/createMessage",
  messageValidator,
  userController.verifyToken,
  userController.authUser,
  messageController.sendMessage
);

router.post(
  "/likeMessage",
  userController.verifyToken,
  userController.authUser,
  messageController.likeMessage
);

router.delete(
  "/unLikeMessage",
  userController.verifyToken,
  userController.authUser,
  messageController.unLikeMessage
);

router.post(
  "/addFriend",
  userController.verifyToken,
  userController.authUser,
  messageController.addFriend
);

router.delete(
  "/removeFriend",
  userController.verifyToken,
  userController.authUser,
  messageController.deleteFriend
);

router.post(
  "/joinGroup",
  userController.verifyToken,
  userController.authUser,
  messageController.joinGroup
);

router.delete(
  "/leaveGroup",
  userController.verifyToken,
  userController.authUser,
  messageController.leaveGroup
);

router.delete(
  "/deleteGroup",
  userController.verifyToken,
  userController.authUser,
  messageController.deleteGroup
);

export default router;
