import prisma from "./client";

const messagesFromUsertoUser = async (authorId: string, sentToId: string) => {
  return prisma.message.findMany({
    where: {
      OR: [
        {
          authorId,
          sentToId,
        },
        {
          authorId: sentToId,
          sentToId: authorId,
        },
      ],
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

export default { messagesFromUsertoUser, messagesToGroup };
