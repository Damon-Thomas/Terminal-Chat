import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userQueries from "../models/userQueries";
import { Request } from "express";
interface AuthenticatedRequest extends Request {
  user?: any;
  token?: string;
}

const authUser = asyncHandler(async (req: AuthenticatedRequest, res, next) => {
  jwt.verify(req.token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      console.log("jwt not verified");
      res.sendStatus(403);
    } else {
      const user = await userQueries.getUser(decoded.user.username);
      if (!user) {
        res.sendStatus(403);
      } else {
        req.user = user;
        console.log("authUser2", req.user);
      }
    }
  });
});

const generateToken = asyncHandler(async (req: AuthenticatedRequest, res) => {
  interface TokenPayload {
    user: any;
  }
  interface JwtSignOptions {
    expiresIn: string;
  }

  jwt.sign(
    { user: req.user } as TokenPayload,
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: "1d" } as JwtSignOptions,
    (err: Error | null, token: string | undefined) => {
      if (err) {
        console.log("jwt not signed");
        res.sendStatus(403);
      } else {
        console.log("generateToken", token);
        res.json({
          token: token,
        });
      }
    }
  );
});

const verifyToken = asyncHandler(
  async (req: AuthenticatedRequest, res, next) => {
    const bearerHeader = req.headers["authorization"];
    console.log("verifyToken", bearerHeader);
    if (typeof bearerHeader !== "undefined") {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
  }
);

const logIN = asyncHandler(async (req: AuthenticatedRequest, res, next) => {
  console.log("login", req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    //check if user exists
    const userExists = await userQueries.getUser(req.body.username);
    if (!userExists) {
      res.status(400).json({ message: "user does not exist", failure: true });
      return;
    }

    // check if password is correct
    if (!(await bcrypt.compare(req.body.password, userExists.password))) {
      res.status(400).json({ message: "incorrect password", failure: true });
      return;
    } else {
      req.user = userExists;
      console.log("user acquired", req.user);
      // Ensure req.user is set before calling next()
      next();
    }
  } catch (error) {
    res.status(400).json({ message: error.message, failure: true });
  }
});

const createUser = asyncHandler(
  async (req: AuthenticatedRequest, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
      const user = await userQueries.createUser(username, hashedPassword);
      next();
    } catch (err) {
      if (
        err.message.includes(
          "Unique constraint failed on the fields: (`username`)"
        )
      ) {
        res.json({ message: "Username already exists", failure: true });
      } else {
        res.json({ message: err.message, failure: true });
      }
    }
  }
);

const logoutUser = asyncHandler(async (req, res) => {
  res.json({ message: "Logged out" });
});

const deleteUser = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const user = req.user;
  const username = user.username;
  try {
    await userQueries.deleteUser(username);
    res.json({ message: "User deleted", success: true });
  } catch (error) {
    res.json({ message: error.message, success: false });
  }
});

export default {
  createUser,
  logIN,
  generateToken,
  verifyToken,
  authUser,
  logoutUser,
  deleteUser,
};
