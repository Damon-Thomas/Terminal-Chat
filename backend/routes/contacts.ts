import { Router } from "express";
import userController from "../controllers/userController.js";
import contactControllers from "../controllers/contactControllers.js";

const router = Router();

router.post(
  "/activeUserContacts",
  userController.verifyToken,
  userController.authUser,
  contactControllers.getActiveUserContacts as any
);

router.post(
  "/getGroups",
  userController.verifyToken,
  userController.authUser,
  contactControllers.getUserGroups as any
);

router.get(
  "/getGroupMembers",
  userController.verifyToken,
  userController.authUser,
  contactControllers.getGroupMembers as any
);

router.post(
  "/getFriendsList",
  userController.verifyToken,
  userController.authUser,
  contactControllers.getFriendsList as any
);

router.post(
  "/getNonContactUsers",
  userController.verifyToken,
  userController.authUser,
  contactControllers.getNonContactUsers as any
);

router.post(
  "/getNonJoinedGroups",
  userController.verifyToken,
  userController.authUser,
  contactControllers.getNonJoinedGroups as any
);

router.post(
  "/areFriends",
  userController.verifyToken,
  userController.authUser,
  contactControllers.areFriends as any
);

export default router;
