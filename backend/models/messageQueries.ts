import prisma from "./client";

const getMessagesBetweenUsers = async (userId: string, sentToId: string) => {
  return await prisma.message.findMany({
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
};

const messagesToGroup = async (groupId: string) => {
  return prisma.message.findMany({
    where: {
      sentToGroupId: groupId,
    },
  });
};

export default { getMessagesBetweenUsers, messagesToGroup };
