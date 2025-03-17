import { body, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import profileQueries from "../models/profileQueries";

//fix this
const getProfile = async (req, res) => {
  console.log(req.user.id);
  const profile = await profileQueries.getProfile(req.user.id);
  if (profile) {
    res.status(200).json({ ...profile, failure: false });
  } else {
    res.status(404).json({ message: "Profile not found", failure: true });
  }
};

//fix this
const updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), failure: true });
  }

  const profile = {
    color: req.body.color,
    profilePic: req.body.profilePic,
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
