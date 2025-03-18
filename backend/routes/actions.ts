import { Router } from "express";
import userController from "../controllers/userController";
import actionController from "../controllers/actionController";
import { messageValidator } from "./validators/messageValidators";

const router = Router();

router.post(
  "/createMessage",
  messageValidator,
  userController.verifyToken,
  userController.authUser,
  actionController.sendMessage
);

router.post(
  "/likeMessage",
  userController.verifyToken,
  userController.authUser,
  actionController.likeMessage
);

router.delete(
  "/unLikeMessage",
  userController.verifyToken,
  userController.authUser,
  actionController.unLikeMessage
);

router.post(
  "/addFriend",
  userController.verifyToken,
  userController.authUser,
  actionController.addFriend
);

router.delete(
  "/removeFriend",
  userController.verifyToken,
  userController.authUser,
  actionController.deleteFriend
);

router.post(
  "/createGroup",
  userController.verifyToken,
  userController.authUser,
  actionController.makeGroup
);

router.post(
  "/joinGroup",
  userController.verifyToken,
  userController.authUser,
  actionController.joinGroup
);

router.delete(
  "/leaveGroup",
  userController.verifyToken,
  userController.authUser,
  actionController.leaveGroup
);

router.delete(
  "/deleteGroup",
  userController.verifyToken,
  userController.authUser,
  actionController.deleteGroup
);

router.put(
  "/setPinnedMessage",
  userController.verifyToken,
  userController.authUser,
  actionController.setPinnedMessage
);

router.delete(
  "/deletePinnedMessage",
  userController.verifyToken,
  userController.authUser,
  actionController.deletePinnedMessage
);

export default router;
