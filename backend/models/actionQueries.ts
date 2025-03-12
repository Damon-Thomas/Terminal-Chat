import prisma from "./client";
import userQueries from "./userQueries";

const sendMessage = async (
  userId: string,
  message: string,
  sentTo: string,
  destinationType: "user" | "group"
) => {
  const user = await userQueries.getUserById(sentTo);
  if (!user) {
    return { message: "User not found", failure: true };
  }

  const newMessage = await prisma.message.create({
    data: {
      authorId: userId,
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
  const likeChecker = await prisma.MessageLikes.findFirst({
    where: {
      userId: userId,
      messageId: messageId,
    },
  });
  if (likeChecker) {
    return { message: "Message already liked", failure: true };
  }
  const newLike = await prisma.MessageLikes.create({
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
  const likeChecker = await prisma.MessageLikes.findFirst({
    where: {
      userId: userId,
      messageId: messageId,
    },
  });
  if (!likeChecker) {
    return { message: "Message not liked", failure: true };
  }
  const likeDeleter = await prisma.MessageLikes.delete({
    where: {
      userId: userId,
      messageId: messageId,
    },
  });

  return { likeDeleter, failure: false };
};

const addFriend = async (userId: string, friendId: string) => {
  const friend = await userQueries.getUserById(friendId);
  if (!friend) {
    return { message: "Friend not found", failure: true };
  }
  const friendMaker = await prisma.UserFriend.findFirst({
    where: {
      userId: userId,
      friendId: friendId,
    },

    update: {}, // No update because the record already exists
    create: {
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
  const friendDeleter = await prisma.UserFriend.delete({
    where: {
      userId: userId,
      friendId: friendId,
    },
  });

  return { friendDeleter, failure: false };
};

const joinGroup = async (userId: string, groupId: string) => {
  const group = await prisma.UserGroup.findUnique({
    where: {
      groupId: groupId,
      userId: userId,
    },
    update: {}, // No update because the record already exists
    create: {
      groupId: groupId,
      userId: userId,
    },
  });
  return { group, failure: false };
};

const leaveGroup = async (userId: string, groupId: string) => {
  const group = await prisma.UserGroup.delete({
    where: {
      groupId: groupId,
      userId: userId,
    },
  });
  return { group, failure: false };
};

const createGroup = async (groupName: string) => {
  await prisma.group.create({
    data: {
      groupName: groupName,
    },
  });
  return { message: "Group created", failure: false };
};

const deleteGroup = async (groupId: string) => {
  await prisma.group.delete({
    where: {
      id: groupId,
    },
  });
  await prisma.UserGroup.delete({
    where: {
      groupId: groupId,
    },
  });
  return { message: "Group deleted", failure: false };
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
  deleteGroup,
};
