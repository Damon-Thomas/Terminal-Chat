import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import actionQueries from "../models/actionQueries";

const sendMessage = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ failure: true, errors: errors.array() });
  }
  const { message, sentTo, destinationType } = req.body;

  try {
    const newMessage = await actionQueries.sendMessage(
      req.user.id,
      message,
      sentTo,
      destinationType
    );
    res.status(200).json(newMessage);
  } catch (e) {
    console.log("error creating message", e);
    res.status(400).json(e);
  }
});

const likeMessage = asyncHandler(async (req, res, next) => {
  console.log("like message body", req.body);
  console.log("req.user", req.user);
  const userId = req.user.id;
  console.log("userId", userId);
  if (!userId) {
    return res.status(400).json({ failure: true, message: "User not found" });
  }

  const { messageId } = req.body;
  console.log("messageId", messageId);
  const newLike = await actionQueries.likeMessage(userId, messageId);
  console.log("newLike", newLike);
  if (newLike.failure) {
    res.status(400).json(newLike);
  } else {
    res.status(200).json(newLike);
  }
});

const unLikeMessage = asyncHandler(async (req, res, next) => {
  console.log("unlike message body", req.body);
  const userId = req.user.id;
  console.log("userId", userId);
  if (!userId) {
    return res.status(400).json({ failure: true, message: "User not found" });
  }
  const { messageId } = req.body;
  console.log("messageId", messageId);
  try {
    const unLike = await actionQueries.unLikeMessage(userId, messageId);
    res.status(200).json(unLike);
  } catch (e) {
    console.log("error unliking message", e);
    res.status(400).json(e);
  }
});

const addFriend = asyncHandler(async (req, res, next) => {
  console.log("add friend body", req.body);
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json({ failure: true, message: "User not found" });
  }
  console.log("add friend body", req.body);
  const { friendId } = req.body;
  const newFriend = await actionQueries.addFriend(userId, friendId);
  if (newFriend.failure) {
    res.status(400).json(newFriend);
  } else {
    res.status(200).json(newFriend);
  }
});

const deleteFriend = asyncHandler(async (req, res, next) => {
  console.log("delete friend body", req.body);
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json({ failure: true, message: "User not found" });
  }
  console.log("delete friend body", req.body);
  const { friendId } = req.body;
  const deleteFriend = await actionQueries.deleteFriend(userId, friendId);
  if (deleteFriend.failure) {
    res.status(400).json(deleteFriend);
  } else {
    res.status(200).json(deleteFriend);
  }
});

const makeGroup = asyncHandler(async (req, res, next) => {
  console.log("make group body", req.body);
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json({ failure: true, message: "User not found" });
  }
  const { groupName } = req.body;
  const newGroup = await actionQueries.createGroup(groupName);
  if (newGroup.failure) {
    res.status(400).json(newGroup);
  } else {
    res.status(200).json(newGroup);
  }
});

const joinGroup = asyncHandler(async (req, res, next) => {
  console.log("join group body", req.body);
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json({ failure: true, message: "User not found" });
  }
  const { groupId } = req.body;
  const joinGroup = await actionQueries.joinGroup(userId, groupId);
  if (joinGroup.failure) {
    res.status(400).json(joinGroup);
  } else {
    res.status(200).json(joinGroup);
  }
});

const leaveGroup = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json({ failure: true, message: "User not found" });
  }
  const { groupId } = req.body;
  const leaveGroup = await actionQueries.leaveGroup(userId, groupId);
  if (leaveGroup.failure) {
    res.status(400).json(leaveGroup);
  } else {
    res.status(200).json(leaveGroup);
  }
});

const deleteGroup = asyncHandler(async (req, res, next) => {
  console.log("delete group body", req.body);
  const { groupId } = req.body;
  try {
    const deleteGroup = await actionQueries.deleteGroup(groupId);
    res.status(200).json({ deleteGroup, failure: false });
  } catch {
    res.status(400).json({ deleteGroup, failure: true });
  }
});

export default {
  sendMessage,
  likeMessage,
  unLikeMessage,
  addFriend,
  deleteFriend,
  makeGroup,
  joinGroup,
  leaveGroup,
  deleteGroup,
};
