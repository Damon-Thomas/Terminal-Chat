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
  "/getMessagesBetweenUsers",
  userController.verifyToken,
  userController.authUser,
  contactControllers.getMessagesBetweenUsers
);

export default router;
