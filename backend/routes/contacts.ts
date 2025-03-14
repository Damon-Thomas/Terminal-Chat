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

export default router;
