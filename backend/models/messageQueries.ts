import prisma from "./client.js";
import userQueries from "./userQueries.js";

const sendMessage = async (
  userId: string,
  username: string,
  message: string,
  sentTo: string,
  destinationType: "user" | "group"
) => {
  const user = await userQueries.getUser(sentTo);
  if (!user) {
    return { message: "User not found", failure: true };
  }

  const newMessage = await prisma.message.create({
    data: {
      authorId: userId,
      username: username,
      content: message,
      sentToId: destinationType === "user" ? sentTo : null,
      sentToGroupId: destinationType === "group" ? sentTo : null,
    },
  });
  return { newMessage, failure: false };
};

const addFriend = async (userId: string, friendId: string) => {
  const friend = await userQueries.getUserById(friendId);
  if (!friend) {
    return { message: "Friend not found", failure: true };
  }
  const friendMaker = await prisma.userFriend.create({
    data: {
      userId: userId,
      friendId: friendId,
    },
  });

  return { friendMaker, failure: false };
};

const deleteFriend = async (userId: string, friendId: string) => {
  const friend = await userQueries.getUserById(friendId);
  if (!friend) {
    return { message: "Friend not found", failure: true };
  }
  const friendDeleter = await prisma.userFriend.delete({
    where: {
      userId_friendId: {
        userId: userId,
        friendId: friendId,
      },
    },
  });

  return { friendDeleter, failure: false };
};

const joinGroup = async (userId: string, groupId: string) => {
  const group = await prisma.userGroup.create({
    data: {
      groupId: groupId,
      userId: userId,
    },
  });
  return { group, failure: false };
};

const leaveGroup = async (userId: string, groupId: string) => {
  const group = await prisma.userGroup.deleteMany({
    where: {
      groupId: groupId,
      userId: userId,
    },
  });
  return { group, failure: false };
};

const createGroup = async (groupName: string, administratorId: string) => {
  await prisma.group.create({
    data: {
      groupName: groupName,
    },
  });
  return { message: "Group created", failure: false };
};

const messagesToGroup = async (groupId: string) => {
  const messages = await prisma.message.findMany({
    where: { sentToGroupId: groupId },
    orderBy: {
      createdAt: "desc",
    },
  });
  return messages;
};

const getMessagesBetweenUsers = async (userId: string, sentToId: string) => {
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        {
          authorId: userId,
          sentToId: sentToId,
        },
        {
          authorId: sentToId,
          sentToId: userId,
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return messages;
};

export default {
  sendMessage,
  addFriend,
  deleteFriend,
  joinGroup,
  leaveGroup,
  createGroup,
  messagesToGroup,
  getMessagesBetweenUsers,
};
