import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import profileQueries from "../models/profileQueries.js";
import { Request, Response } from "express";

export interface UserRequest extends Request {
  user: {
    id: string;
    username: string;
  };
}

interface Profile {
  id: string;
  bio: string;
  intro: string;
}

const getProfile = async (req: UserRequest, res: Response) => {
  const { userId } = req.body;
  const profile: Profile | null = await profileQueries.getProfile(userId);
  if (profile) {
    res.status(200).json({ ...profile, failure: false });
  } else {
    res.status(404).json({ message: "Profile not found", failure: true });
  }
};

const updateProfile = async (req: UserRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array(), failure: true });
    return;
  }

  const profile = {
    bio: req.body.bio,
    intro: req.body.intro,
  };

  const updatedProfile = await profileQueries.updateProfile(
    req.user.id,
    profile
  );
  if (updatedProfile) {
    res.status(200).json({ ...updatedProfile, failure: false });
  } else {
    res.status(404).json({ message: "Profile not found", failure: true });
  }
};

export default {
  getProfile,
  updateProfile,
};
