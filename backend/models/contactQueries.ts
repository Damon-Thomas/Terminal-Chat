import prisma from "./client";

const getCurrentConversationUsers = async (userId: string) => {
  //Users that the user has sent messages to
  const sentMessageUsers = await prisma.message.findMany({
    where: {
      authorId: userId,
      sentTo: { isNot: null }, // filter out group messages
    },
    select: {
      sentTo: {
        select: {
          id: true,
          username: true,
          lastLogin: true,
        },
      },
    },
  });

  // Get all users who sent messages to the user.
  const receivedMessageUsers = await prisma.message.findMany({
    where: { sentToId: userId },
    select: {
      author: true,
    },
  });

  // Combine the two lists of users and remove duplicates
  const users = new Set();
  sentMessageUsers.forEach((user) => {
    users.add(user.sentTo);
  });
  receivedMessageUsers.forEach((user) => {
    users.add(user.author);
  });

  return Array.from(users);
};

const getGroupsUserHasJoined = async (userId: string) => {
  return await prisma.UserGroup.findMany({
    where: {
      userId: userId,
    },
    select: {
      group: true,
    },
  });
};

const getGroupMembers = async (groupId: string) => {
  console.log("Query Group Id", groupId);
  return await prisma.UserGroup.findMany({
    where: {
      groupId: groupId,
    },
    select: {
      user: true,
    },
  });
};

const getFriendsList = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      friends: true,
    },
  });
};

const getUserContacts = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      groups: true,
      friends: true,
    },
  });
};

export default {
  getUserContacts,
  getGroupsUserHasJoined,
  getFriendsList,
  getCurrentConversationUsers,
  getMessagesBetweenUsers,
  getGroupMembers,
};
