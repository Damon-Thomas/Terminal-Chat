import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import actionQueries from "../models/actionQueries.js";
import { Request, Response } from "express";
import { UserRequest } from "./profileController.js";
import { User } from "@prisma/client";

const sendMessage = async (req: UserRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ failure: true, errors: errors.array() });
  }
  const { message, sentTo, username, destinationType, pinned } = req.body;
  if (!sentTo) {
    return res
      .status(400)
      .json({ failure: true, message: "No recipient specified" });
  }
  try {
    const newMessage = await actionQueries.sendMessage(
      req.user.id,
      message,
      username,
      sentTo,
      destinationType,
      pinned
    );

    res.status(200).json(newMessage);
  } catch (e) {
    console.log("error creating message", e);
    res.status(400).json(e);
  }
};

const likeMessage = async (req: UserRequest, res: Response) => {
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
};

const unLikeMessage = async (req: UserRequest, res: Response) => {
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
};

const addFriend = async (req: UserRequest, res: Response) => {
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
};

const deleteFriend = async (req: UserRequest, res: Response) => {
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
};

const makeGroup = async (req: UserRequest, res: Response) => {
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
      if (newGroup && newGroup.group) {
        actionQueries.joinGroup(userId, newGroup.group.id);
      } else {
        console.log("created group not joined");
      }
      res.status(200).json(newGroup);
    }
  } catch (e) {
    console.log("error making group", e);
    res.status(400).json({ e, failure: true });
  }
};

const joinGroup = async (req: UserRequest, res: Response) => {
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
};

const leaveGroup = async (req: UserRequest, res: Response) => {
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
};

const deleteGroup = async (req: UserRequest, res: Response) => {
  const { groupId } = req.body;
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
};

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
