import { body } from "express-validator";

const messageValidator = [
  body("message")
    .trim()
    .isLength({ min: 1, max: 300 })
    .withMessage("Message required length 1-300"),
];

export { messageValidator };
