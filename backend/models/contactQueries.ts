import prisma from "./client.js";

const getUsersSentMessageTo = async (userId: string) => {
  return await prisma.message.findMany({
    where: {
      authorId: userId,
    },
    select: {
      sentTo: true,
    },
  });
};

const getUsersThatSentMessagesToUser = async (userId: string) => {
  return await prisma.message.findMany({
    where: {
      sentTo: userId,
    },
    select: {
      author: true,
    },
  });
};

//gets users that have been contacted
//not complete. Need to filter out user and duplicates so that only unique users that are not the main user are returned. Return array of users including usernames and ids
const getUsersContacted = async (userId: string) => {
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        {
          authorId: userId,
        },
        {
          sentTo: userId,
        },
      ],
    },
    select: {
      author: true,
      sentTo: true,
    },
  });
  return messages;
};

const getGroupsUserHasJoined = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      groups: true,
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
  getUsersSentMessageTo,
  getUsersThatSentMessagesToUser,
  getUsersContacted,
  getGroupsUserHasJoined,
  getFriendsList,
};
