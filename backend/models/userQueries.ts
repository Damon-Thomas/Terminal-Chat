import prisma from "./client.js";
import asyncHandler from "express-async-handler";

const createUser = async (username, password) => {
  const newUser = await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });
  return newUser;
};

const getUser = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  return user;
};

export default {
  createUser,
  getUser,
};
