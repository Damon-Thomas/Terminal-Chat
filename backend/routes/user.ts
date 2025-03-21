import { Router } from "express";
import userController from "../controllers/userController";
import {
  loginInputValidator,
  registerValidator,
} from "./validators/userValidators";

const router = Router();

router.post(
  "/createUser",
  registerValidator,
  userController.createUser,
  userController.logIN,
  userController.generateToken
);

router.get(
  "/verify",
  userController.verifyToken,
  userController.authUser,
  userController.getUser
);

router.post(
  "/login",
  loginInputValidator,
  userController.logIN,
  userController.generateToken
);

router.delete(
  "/deleteUser",
  userController.verifyToken,
  userController.authUser,
  userController.deleteUser
);

router.post(
  "/logout",
  userController.verifyToken,
  userController.authUser,
  userController.logoutUser
);

export default router;
