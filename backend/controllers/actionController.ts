import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import actionQueries from "../models/actionQueries";

const sendMessage = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ failure: true, errors: errors.array() });
  }
  const { message, sentTo, destinationType, pinned } = req.body;

  try {
    const newMessage = await actionQueries.sendMessage(
      req.user.id,
      message,
      sentTo,
      destinationType,
      pinned
    );

    res.status(200).json(newMessage);
  } catch (e) {
    console.log("error creating message", e);
    res.status(400).json(e);
  }
});

const setPinnedMessage = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ failure: true, errors: errors.array() });
  }
  const { groupId, content } = req.body;
  try {
    const pinnedMessage = await actionQueries.setPinnedMessage(
      req.user.id,
      groupId,
      content
    );
    if (pinnedMessage.failure) {
      return res.status(403).json(pinnedMessage);
    }
    res.status(200).json({ ...pinnedMessage, failure: false });
  } catch (e) {
    console.log("error setting pinned message", e);
    res.status(400).json({ error: e, failure: true });
  }
});

const deletePinnedMessage = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ failure: true, errors: errors.array() });
  }
  const { groupId } = req.body;
  try {
    const deletePinnedMessage = await actionQueries.deletePinnedMessage(
      req.user.id,
      groupId
    );
    if (deletePinnedMessage.failure) {
      return res.status(403).json(deletePinnedMessage);
    }
    res.status(200).json({ ...deletePinnedMessage, failure: false });
  } catch (e) {
    console.log("error deleting pinned message", e);
    res.status(400).json({ error: e, failure: true });
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
    const newGroup = await actionQueries.createGroup(groupName, userId);
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
  const { groupId } = req.body;
  console.log("deleteGroup", groupId);
  try {
    const deleteGroup = await actionQueries.deleteGroup(groupId, req.user.id);
    if (
      deleteGroup &&
      deleteGroup.failure &&
      deleteGroup.message === "User is not the group administrator!"
    ) {
      return res.status(403).json({ ...deleteGroup });
    }
    if (deleteGroup && !deleteGroup.failure) {
      res.status(200).json({ ...deleteGroup });
    } else {
      res.status(400).json({ ...deleteGroup });
    }
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
  setPinnedMessage,
  deletePinnedMessage,
};
