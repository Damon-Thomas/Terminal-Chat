import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import messageQueries from "../models/messageQueries";

const getMessagesToGroup = asyncHandler(async (req, res) => {
  const { groupId } = req.body;
  try {
    const messages = await messageQueries.messagesToGroup(groupId);
    res.status(200).json({ messages, failure: false });
  } catch (error) {
    res.status(400).json({ message: error.message, error, failure: true });
  }
});

const getMessagesBetweenUsers = asyncHandler(async (req, res) => {
  const { sentToId } = req.body;
  const userId = req.user.id;
  console.log("getMessagesBetweenUsers", userId, sentToId);
  try {
    const messages = await messageQueries.getMessagesBetweenUsers(
      userId,
      sentToId
    );
    res.status(200).json({ messages, failure: false });
  } catch (error) {
    res.status(400).json({ message: error.message, error, failure: true });
  }
});

export default {
  getMessagesBetweenUsers,
  getMessagesToGroup,
};
