import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import "../types/express"; // Import the extended Request type
import { Request, Response } from "express";
import messageQueries from "../models/messageQueries";
import { UserRequest } from "./profileController";

// Extend Express types here
declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      // Add other properties of the user object if needed
    };
  }
}

const getMessagesToGroup = asyncHandler(async (req, res) => {
  const { groupId } = req.body;
  try {
    const messages = await messageQueries.messagesToGroup(groupId);
    res.status(200).json({ messages, failure: false });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(400).json({ message: errorMessage, error, failure: true });
  }
});
const getMessagesBetweenUsers = asyncHandler(
  async (req: Request, res: Response) => {
    const { sentToId } = req.body;

    const userId = (req as UserRequest).user.id;
    try {
      const messages = await messageQueries.getMessagesBetweenUsers(
        userId,
        sentToId
      );
      res.status(200).json({ messages, failure: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(400).json({ message: errorMessage, error, failure: true });
    }
  }
);

export default {
  getMessagesBetweenUsers,
  getMessagesToGroup,
};
