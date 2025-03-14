import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import contactQueries from "../models/contactQueries";

// const getActiveUserContacts = asyncHandler(async (req, res) => {
const getActiveUserContacts = async (req, res) => {
  console.log("getActiveUserContacts", req.user.id);
  if (!req.user.id) {
    return res.status(400).json({ failure: true, message: "User not found" });
  }
  try {
    const users = await contactQueries.getCurrentConversationUsers(req.user.id);
    res.status(200).json({ users, failure: false });
  } catch (error) {
    res.status(400).json({ message: error.message, error, failure: true });
  }
};

const getMessagesBetweenUsers = asyncHandler(async (req, res) => {
  const { sentToId } = req.body;
  const userId = req.user.id;
  console.log("getMessagesBetweenUsers", userId, sentToId);
  try {
    const messages = await contactQueries.getMessagesBetweenUsers(
      userId,
      sentToId
    );
    res.status(200).json({ messages, failure: false });
  } catch (error) {
    res.status(400).json({ message: error.message, error, failure: true });
  }
});

export default {
  getActiveUserContacts,
  getMessagesBetweenUsers,
};
