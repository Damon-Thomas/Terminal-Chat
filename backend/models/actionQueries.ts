import prisma from "./client.js";
import userQueries from "./userQueries.js";

const sendMessage = async (
  userId: string,
  message: string,
  username: string,
  sentTo: string,
  destinationType: "user" | "group",
  pinned: boolean = false
) => {
  if (destinationType === "user" && sentTo === userId) {
    return { message: "Cannot send message to self", failure: true };
  }
  if (destinationType === "user") {
    const user = await userQueries.getUserById(sentTo);
    if (!user) {
      return { message: "User not found", failure: true };
    }
  } else if (destinationType === "group") {
    const group = await prisma.group.findUnique({
      where: { id: sentTo },
    });
    if (!group) {
      return { message: "Group not found", failure: true };
    }
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
  return { ...newMessage, failure: false };
};

const addFriend = async (userId: string, friendId: string) => {
  const friend = await userQueries.getUserById(friendId);
  if (!friend) {
    return { message: "Friend not found", failure: true };
  }

  // Use upsert to either insert if the record does not exist.
  const friendMaker = await prisma.userFriend.upsert({
    where: {
      userId_friendId: { userId: userId, friendId: friendId },
    },
    update: {}, // No update since record exists
    create: { userId, friendId },
  });
  return { friendMaker, failure: false };
};

const deleteFriend = async (userId: string, friendId: string) => {
  const friend = await userQueries.getUserById(friendId);
  if (!friend) {
    return { message: "Friend not found", failure: true };
  }
  const friendDeleter = await prisma.userFriend.delete({
    where: { userId_friendId: { userId, friendId } },
  });
  return { friendDeleter, failure: false };
};

const joinGroup = async (userId: string, groupId: string) => {
  // Use upsert with the composite key (assuming it's defined as groupId_userId)
  const group = await prisma.userGroup.upsert({
    where: {
      userId_groupId: { userId, groupId },
    },
    update: {}, // No update because the record exists
    create: { userId, groupId },
  });
  return { group };
};

const leaveGroup = async (userId: string, groupId: string) => {
  const group = await prisma.userGroup.delete({
    where: { userId_groupId: { groupId, userId } },
  });
  return { group };
};

const createGroup = async (groupName: string) => {
  const groupExists = await prisma.group.findFirst({
    where: { groupName },
  });
  if (groupExists) {
    return { message: "Group already exists", failure: true };
  }
  const group = await prisma.group.create({
    data: { groupName },
  });
  return { group, failure: false };
};

const deleteGroup = async (groupId: string, userId: string) => {
  if (!groupId || !userId) {
    return { message: "Invalid input", failure: true };
  }

  await prisma.userGroup.deleteMany({
    where: { groupId },
  });
  await prisma.group.delete({
    where: { id: groupId },
  });
  return { message: "Group deleted", failure: false };
};

export default {
  sendMessage,
  addFriend,
  deleteFriend,
  joinGroup,
  leaveGroup,
  createGroup,
  deleteGroup,
};
