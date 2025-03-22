import { Router } from "express";
import userController from "../controllers/userController";
import profileController from "../controllers/profileController";

const router = Router();

router.get(
  "/getProfile",
  userController.verifyToken,
  userController.authUser,
  profileController.getProfile as any
);
router.post(
  "/updateProfile",
  userController.verifyToken,
  userController.authUser,
  profileController.updateProfile as any
);

export default router;
