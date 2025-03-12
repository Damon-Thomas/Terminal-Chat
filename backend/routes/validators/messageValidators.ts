import { body } from "express-validator";

const messageValidator = [
  body("message")
    .trim()
    .isLength({ min: 1, max: 150 })
    .withMessage("Message required length 1-150"),
];

export { messageValidator };
