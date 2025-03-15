import { Router } from "express";
import userController from "../controllers/userController";
import contactControllers from "../controllers/contactControllers";

const router = Router();

router.get(
  "/activeUserContacts",
  userController.verifyToken,
  userController.authUser,
  contactControllers.getActiveUserContacts
);

router.get(
  "/getGroups",
  userController.verifyToken,
  userController.authUser,
  contactControllers.getUserGroups
);

router.get(
  "/getGroupMembers",
  userController.verifyToken,
  userController.authUser,
  contactControllers.getGroupMembers
);

router.get(
  "/getFriendsList",
  userController.verifyToken,
  userController.authUser,
  contactControllers.getFriendsList
);

router.get(
  "/getNonContactUsers",
  userController.verifyToken,
  userController.authUser,
  contactControllers.getNonContactUsers
);

router.get(
  "/getNonJoinedGroups",
  userController.verifyToken,
  userController.authUser,
  contactControllers.getNonJoinedGroups
);

export default router;
