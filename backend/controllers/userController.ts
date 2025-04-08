import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userQueries from "../models/userQueries.js";
import { Request } from "express";
import leoProfanity from "leo-profanity";

interface AuthenticatedRequest extends Request {
  user?: any;
  token?: string;
}

interface DeleteRequest extends Request {
  user?: any;
  token?: string;
  body: {
    password?: string;
  };
}
const authUser = asyncHandler(async (req: AuthenticatedRequest, res, next) => {
  interface DecodedToken {
    user: {
      username: string;
    };
  }

  try {
    const decoded = jwt.verify(
      req.token as string,
      process.env.JWT_SECRET_KEY as string
    ) as DecodedToken;

    const user = await userQueries.getUser(decoded.user.username);
    if (!user) {
      res.sendStatus(403);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.sendStatus(403);
  }
});

const getUser = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const user = req.user;
  if (user) {
    res.status(200).json({
      id: user.id,
      username: user.username,
      success: true,
    });
  } else {
    res.status(400).json({ message: "User not found", failure: true });
  }
});

const generateToken = asyncHandler(async (req: AuthenticatedRequest, res) => {
  interface TokenPayload {
    user: any;
  }

  const user = req.user;
  if (!user) {
    res.status(400).json({ message: "User not found", failure: true });
    return;
  }

  jwt.sign(
    { user } as TokenPayload,
    process.env.JWT_SECRET_KEY as string,
    { expiresIn: "1d" },
    (err: Error | null, token: string | undefined) => {
      if (err || !token) {
        res
          .status(403)
          .json({ message: "Failed to generate token", failure: true });
      } else {
        res.status(200).json({
          token: token,
          id: user.id,
          username: user.username,
          success: true,
        });
      }
    }
  );
});

const verifyToken = asyncHandler(
  async (req: AuthenticatedRequest, res, next) => {
    const bearerHeader = req.headers["authorization"];

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

      // Ensure req.user is set before calling next()
      next();
    }
  } catch (error: any) {
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
    const isProfane = leoProfanity.check(username);

    if (isProfane) {
      res
        .status(400)
        .json({ failure: true, message: "Inappropriate language detected." });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
      const user = await userQueries.createUser(username, hashedPassword);
      if (!user || user.failure) {
        res.status(400).json({ message: "User not created", failure: true });
        return;
      }

      next();
    } catch (err: any) {
      if (
        err.message.includes(
          "Unique constraint failed on the fields: (`username`)"
        )
      ) {
        res
          .status(400)
          .json({ message: "Username already exists", failure: true });
      } else {
        res.status(400).json({ message: err.message, failure: true });
      }
    }
  }
);

const logoutUser = asyncHandler(async (req: AuthenticatedRequest, res) => {
  const user = req.user;

  if (user) {
    try {
      await userQueries.loginUpdate(user.id);

      res.status(200).json({ message: "Logged out", failure: false });
    } catch {
      res
        .status(500)
        .json({ message: "Failed to update login status", failure: true });
    }
  } else {
    res.status(400).json({ message: "User not found", failure: true });
  }
});

const deleteUser = asyncHandler(async (req: DeleteRequest, res, next) => {
  const user = req.user;
  const username = user.username;
  const { password } = req.body;
  if (password !== process.env.ADMIN_PASSWORD) {
    res.status(400).json({ failure: true, message: "Invalid password" });
    return;
  }
  const userDeleter = await userQueries.deleteUser(username);
  if (userDeleter && !userDeleter.failure) {
    res.status(200).json({ message: "User deleted", failure: false });
  } else if (userDeleter && userDeleter.failure) {
    res.status(400).json({
      message: "User not deleted",
      failure: true,
      stepsCompleted: userDeleter.stepsCompleted || 0,
    });
  } else {
    res.status(500).json({ message: "deleter did not work", failure: true });
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
  getUser,
};
