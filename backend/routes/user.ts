import { Router } from "express";
import { UserController } from "../controllers/user";
import {
  loginInputValidator,
  registerValidator,
} from "../validators/userValidators";
import jwt from "jsonwebtoken";
import passport from "passport";

const router = Router();

router.get("/", UserController.getUser);
router.post(
  "/createUser",
  registerValidator,
  userController.createUser,
  userController.logIN,
  userController.generateToken
);
router.post(
  "/login",
  loginInputValidator,
  userController.logIN,
  userController.generateToken
);
router.get(
  "/deleteUser",
  userController.verifyToken,
  userController.authUser,
  userController.deleteUser
);

router.post("/login", (req, res) => {
  let { email, password } = req.body;
  //This lookup would normally be done using a database
  if (email === "paul@nanosoft.co.za") {
    if (password === "pass") {
      //the password compare would normally be done using bcrypt.
      const opts = {};
      opts.expiresIn = 120; //token expires in 2min
      const secret = "SECRET_KEY"; //normally stored in process.env.secret
      const token = jwt.sign({ email }, secret, opts);
      return res.status(200).json({
        message: "Auth Passed",
        token,
      });
    }
  }
  return res.status(401).json({ message: "Auth Failed" });
});

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.status(200).send("YAY! this is a protected Route");
  }
);

export default router;
