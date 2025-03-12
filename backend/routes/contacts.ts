import { Router } from "express";
import userController from "../controllers/userController";

const router = Router();

router.get("/userContacts", userController.fullAuth, (req, res) => {
  res.status(200).send("User messages");
});

export default router;
