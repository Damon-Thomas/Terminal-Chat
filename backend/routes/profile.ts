import { Router } from "express";
import userController from "../controllers/userController";
import profileController from "../controllers/profileController";

const router = Router();

router.get(
  "/getProfile",
  userController.verifyToken,
  userController.authUser,
  profileController.getProfile
);
router.post(
  "/updateProfile",
  userController.verifyToken,
  userController.authUser,
  profileController.updateProfile
);

export default router;
