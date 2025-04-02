import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import contactQueries from "../models/contactQueries.js";
import { UserRequest } from "./profileController.js";
import { Request, Response } from "express";

interface GroupRequest extends Request {
  body: {
    groupId: string;
  };
}

// const getActiveUserContacts = asyncHandler(async (req, res) => {
const getActiveUserContacts = async (req: UserRequest, res: Response) => {
  if (!req.user.id) {
    return res.status(400).json({ failure: true, message: "User not found" });
  }
  const { page } = req.body || 1;
  try {
    const users = await contactQueries.getCurrentConversationUsers(
      req.user.id,
      page
    );
    res.status(200).json({ users, failure: false });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    res.status(400).json({ message: errorMessage, error, failure: true });
  }
};

const getUserGroups = async (req: UserRequest, res: Response) => {
  if (!req.user.id) {
    return res.status(400).json({ failure: true, message: "User not found" });
  }
  const { page } = req.body || 1;
  try {
    const groups = await contactQueries.getGroupsUserHasJoined(
      req.user.id,
      page
    );
    res.status(200).json({ groups, failure: false });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    res.status(400).json({ message: errorMessage, error, failure: true });
  }
};

const getGroupMembers = async (req: GroupRequest, res: Response) => {
  const { groupId } = req.body;
  if (!groupId) {
    return res
      .status(400)
      .json({ failure: true, message: "Group not found", received: req.body });
  }
  try {
    const members = await contactQueries.getGroupMembers(groupId);
    res.status(200).json({ members, failure: false });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    res.status(400).json({ message: errorMessage, error, failure: true });
  }
};

const getFriendsList = async (req: UserRequest, res: Response) => {
  const userId = req.user.id;
  const { page } = req.body || 1;
  try {
    const friends = await contactQueries.getFriendsList(userId, page);
    res.status(200).json({ friends, failure: false });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    res.status(400).json({ message: errorMessage, error, failure: true });
  }
};
const getNonContactUsers = async (req: UserRequest, res: Response) => {
  const userId = req.user.id;
  const { page } = req.body || 1;
  try {
    const users = await contactQueries.getNonContactUsers(userId, page);
    res.status(200).json({ users, failure: false });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    res.status(400).json({ message: errorMessage, error, failure: true });
  }
};

const getNonJoinedGroups = async (req: UserRequest, res: Response) => {
  const userId = req.user.id;
  const { page } = req.body || 1;
  try {
    const groups = await contactQueries.getNonJoinedGroups(userId, page);
    res.status(200).json({ groups, failure: false });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    res.status(400).json({ message: errorMessage, error, failure: true });
  }
};

const areFriends = async (req: UserRequest, res: Response) => {
  const { friendId } = req.body;
  if (!req.user.id) {
    return res
      .status(400)
      .json({ failure: true, message: "User not verified" });
  }
  try {
    const friends = await contactQueries.areFriends(req.user.id, friendId);
    res.status(200).json({ friends, failure: false });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown Error";
    res.status(400).json({ message: errorMessage, error, failure: true });
  }
};

export default {
  getActiveUserContacts,
  getFriendsList,
  getUserGroups,
  getGroupMembers,
  getNonContactUsers,
  getNonJoinedGroups,
  areFriends,
};
