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
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({ failure: true, message: "User not found" });
  }

  const { messageId } = req.body;
  try {
    const newLike = await actionQueries.likeMessage(userId, messageId);
    res.status(200).json({ newLike, failure: false });
  } catch (e) {
    console.log("error liking message", e);
    res.status(400).json({ error: e, failure: true });
  }
});

const unLikeMessage = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({ failure: true, message: "User not found" });
  }
  const { messageId } = req.body;

  try {
    const unLike = await actionQueries.unLikeMessage(userId, messageId);
    res.status(200).json(unLike);
  } catch (e) {
    console.log("error unliking message", e);
    res.status(400).json(e);
  }
});

const addFriend = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json({ failure: true, message: "User not found" });
  }

  const { friendId } = req.body;

  try {
    const newFriend = await actionQueries.addFriend(userId, friendId);
    res.status(200).json({ newFriend, failure: false });
  } catch (e) {
    console.log("error adding friend", e);
    res.status(400).json({ e, failure: true });
  }
});

const deleteFriend = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json({ failure: true, message: "User not found" });
  }
  const { friendId } = req.body;
  try {
    const deleteFriend = await actionQueries.deleteFriend(userId, friendId);
    res.status(200).json({ deleteFriend, failure: false });
  } catch (e) {
    console.log("error deleting friend", e);
    res.status(400).json({ e, failure: true });
  }
});

const makeGroup = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json({ failure: true, message: "User not found" });
  }
  const { groupName } = req.body;
  try {
    const newGroup = await actionQueries.createGroup(groupName);
    if (newGroup.failure) {
      return res
        .status(400)
        .json({ newGroup, failure: true, message: "Group already Exists" });
    } else {
      res.status(200).json(newGroup);
    }
  } catch (e) {
    console.log("error making group", e);
    res.status(400).json({ e, failure: true });
  }
});

const joinGroup = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json({ failure: true, message: "User not found" });
  }
  const { groupId } = req.body;
  try {
    const joinGroup = await actionQueries.joinGroup(userId, groupId);
    res.status(200).json({ ...joinGroup, failure: false });
  } catch (e) {
    console.log("error joining group", e);
    res.status(400).json({ e, failure: true });
  }
});

const leaveGroup = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json({ failure: true, message: "User not found" });
  }
  const { groupId } = req.body;
  try {
    const leaveGroup = await actionQueries.leaveGroup(userId, groupId);
    res.status(200).json({ leaveGroup, failure: false });
  } catch (e) {
    console.log("error leaving group", e);
    res.status(400).json({ e, failure: true });
  }
});

const deleteGroup = asyncHandler(async (req, res, next) => {
  const { groupId, masterKey } = req.body;
  console.log("deleteGroup", groupId);
  if (masterKey !== process.env.MASTER_KEY) {
    return res
      .status(400)
      .json({ failure: true, message: "Master Key is incorrect" });
  }
  try {
    const deleteGroup = await actionQueries.deleteGroup(groupId);
    res.status(200).json({ deleteGroup, failure: false });
  } catch (e) {
    console.log("error deleting group", e);
    res.status(400).json({ e, failure: true });
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
