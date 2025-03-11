import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import messageQueries from "../models/messageQueries";

const sendMessage = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ failure: true, errors: errors.array() });
  }
  const { message, sentTo, destinationType } = req.body;
  const newMessage = await messageQueries.sendMessage(
    req.user.id,
    message,
    sentTo,
    destinationType
  );
  if (newMessage.failure) {
    res.status(400).json(newMessage);
  } else {
    res.status(200).json(newMessage);
  }
});

const likeMessage = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json({ failure: true, message: "User not found" });
  }
  const { messageId } = req.body;
  const newLike = await messageQueries.likeMessage(userId, messageId);
  if (newLike.failure) {
    res.status(400).json(newLike);
  } else {
    res.status(200).json(newLike);
  }
});

const unLikeMessage = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json({ failure: true, message: "User not found" });
  }
  const { messageId } = req.body;
  const unLike = await messageQueries.unLikeMessage(userId, messageId);
  if (unLike.failure) {
    res.status(400).json(unLike);
  } else {
    res.status(200).json(unLike);
  }
});

const addFriend = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json({ failure: true, message: "User not found" });
  }
  const { friendId } = req.body;
  const newFriend = await messageQueries.addFriend(userId, friendId);
  if (newFriend.failure) {
    res.status(400).json(newFriend);
  } else {
    res.status(200).json(newFriend);
  }
});

const deleteFriend = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json({ failure: true, message: "User not found" });
  }
  const { friendId } = req.body;
  const deleteFriend = await messageQueries.deleteFriend(userId, friendId);
  if (deleteFriend.failure) {
    res.status(400).json(deleteFriend);
  } else {
    res.status(200).json(deleteFriend);
  }
});

const makeGroup = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json({ failure: true, message: "User not found" });
  }
  const { groupName } = req.body;
  const newGroup = await messageQueries.createGroup(groupName);
  if (newGroup.failure) {
    res.status(400).json(newGroup);
  } else {
    res.status(200).json(newGroup);
  }
});

const joinGroup = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json({ failure: true, message: "User not found" });
  }
  const { groupId } = req.body;
  const joinGroup = await messageQueries.joinGroup(userId, groupId);
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
  const leaveGroup = await messageQueries.leaveGroup(userId, groupId);
  if (leaveGroup.failure) {
    res.status(400).json(leaveGroup);
  } else {
    res.status(200).json(leaveGroup);
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
};
