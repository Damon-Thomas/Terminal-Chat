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

const likeMessage = async (userId: string, messageId: string) => {
  const message = await prisma.message.findUnique({
    where: {
      id: messageId,
    },
  });
  if (!message) {
    return { message: "Message not found", failure: true };
  }
  const likeChecker = await prisma.messageLikes.findFirst({
    where: {
      userId: userId,
      messageId: messageId,
    },
  });
  if (likeChecker) {
    return { message: "Message already liked", failure: true };
  }
  const newLike = await prisma.messageLikes.create({
    data: {
      userId: userId,
      messageId: messageId,
    },
  });

  return { newLike, failure: false };
};

const unLikeMessage = async (userId: string, messageId: string) => {
  const message = await prisma.message.findUnique({
    where: {
      id: messageId,
    },
  });
  if (!message) {
    return { message: "Message not found", failure: true };
  }
  const likeChecker = await prisma.messageLikes.findFirst({
    where: {
      userId: userId,
      messageId: messageId,
    },
  });
  if (!likeChecker) {
    return { message: "Message not liked", failure: true };
  }
  const likeDeleter = await prisma.messageLikes.delete({
    where: {
      userId_messageId: {
        userId: userId,
        messageId: messageId,
      },
    },
  });

  return { likeDeleter, failure: false };
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
  likeMessage,
  addFriend,
  deleteFriend,
  joinGroup,
  leaveGroup,
  createGroup,
  unLikeMessage,
  messagesToGroup,
  getMessagesBetweenUsers,
};
