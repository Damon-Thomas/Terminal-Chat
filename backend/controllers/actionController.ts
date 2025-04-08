import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import actionQueries from "../models/actionQueries.js";
import { Request, Response } from "express";
import { UserRequest } from "./profileController.js";
import { User } from "@prisma/client";
import leoProfanity from "leo-profanity";

const sendMessage = async (req: UserRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ failure: true, errors: errors.array() });
  }
  const { message, sentTo, username, destinationType } = req.body;

  const isProfane = leoProfanity.check(message);

  if (isProfane) {
    return res
      .status(400)
      .json({ failure: true, message: "Inappropriate language detected." });
  }

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
      destinationType
    );

    res.status(200).json(newMessage);
  } catch (e) {
    console.log("error creating message", e);
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

  const isProfane = leoProfanity.check(groupName);

  if (isProfane) {
    return res
      .status(400)
      .json({ failure: true, message: "Inappropriate language detected." });
  }

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
  const { groupId, password } = req.body;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(400).json({ failure: true, message: "Invalid password" });
  }
  try {
    const deleteGroup = await actionQueries.deleteGroup(groupId, req.user.id);
    if (deleteGroup && deleteGroup.failure) {
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
  addFriend,
  deleteFriend,
  makeGroup,
  joinGroup,
  leaveGroup,
  deleteGroup,
};
