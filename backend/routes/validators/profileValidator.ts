import { body } from "express-validator";

const profileValidator = [
  body("color")
    .trim()
    .matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/)
    .withMessage("Color must be a valid hex code"),
  //fix this
  body("profilePic").trim().optional(),
  body("bio")
    .trim()
    .isLength({ min: 0, max: 250 })
    .withMessage("Bio must be between 0-250 characters")
    .bail()
    .isAscii()
    .withMessage("Bio must be ASCII")
    .escape(),

  body("intro")
    .trim()
    .isLength({ min: 0, max: 100 })
    .withMessage("Intro must be between 0-100 characters")
    .bail()
    .isAscii()
    .withMessage("Intro must be ASCII")
    .escape(),
];

export { profileValidator };
