import prisma from "./client.js";

const createUser = async (username: string, password: string) => {
  const newUser = await prisma.user.create({
    data: {
      username: username,
      password: password,
    },
  });

  if (newUser) {
    try {
      await createProfile(newUser.id);
      return { newUser, failure: false };
    } catch (error) {
      console.log("Error creating profile: ", error);
      deleteUser(username);
      return { error, failure: true };
    }
  }
};

const getUser = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  return user;
};

const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
};

//later add functionality to delete user files
//delete cloud files
const deleteUser = async (username: string) => {
  const user = await getUser(username);
  let stepsCompleted = 0;
  if (!user) {
    return user;
  } else {
    try {
      //remove likes from messages
      await prisma.messageLikes.deleteMany({
        where: {
          userId: user.id,
        },
      });
      stepsCompleted++;
      //delete all messages sent by user
      await prisma.message.deleteMany({
        where: {
          authorId: user.id,
        },
      });
      stepsCompleted++;
      //delete all messages sent to user
      await prisma.message.deleteMany({
        where: {
          sentToId: user.id,
        },
      });
      stepsCompleted++;

      //delete user from groups
      await prisma.userGroup.deleteMany({
        where: {
          userId: user.id,
        },
      });
      stepsCompleted++;

      //deleteGroupsUserIsAdminOf
      await prisma.group.deleteMany({
        where: {
          administratorId: user.id,
        },
      });
      stepsCompleted++;

      //delete user from friends lists
      await prisma.userFriend.deleteMany({
        where: {
          OR: [{ userId: user.id }, { friendId: user.id }],
        },
      });
      stepsCompleted++;

      //remove user profile
      await prisma.profile.delete({
        where: {
          id: user.id,
        },
      });
      stepsCompleted++;

      //delete user
      await prisma.user.delete({
        where: {
          username: username,
        },
      });
      stepsCompleted++;

      return { failure: false, stepsCompleted: stepsCompleted };
    } catch (error) {
      console.log(
        "Error profile not deleted completely: Please try again",
        "   Deletions complete:",
        stepsCompleted,
        "/6",
        error
      );
      return { error, stepsCompleted: stepsCompleted, failure: true };
    }
  }
};

const createProfile = async (userId: string) => {
  try {
    await prisma.profile.create({
      data: {
        id: userId,
        userId: userId,
      },
    });
    return true;
  } catch (error) {
    console.log("Error creating profile: ", error);
    return error;
  }
};

//profilePic is a url to cloud database file
//color is a hex code
const updateProfile = async (
  userId: string,
  color: string,
  profilePic: string,
  bio: string,
  intro: string
) => {
  try {
    await prisma.profile.update({
      where: {
        userId: userId,
      },
      data: {
        color: color,
        profilePic: profilePic,
        bio: bio,
        intro: intro,
      },
    });
  } catch (error) {
    console.log("Error updating profile: ", error);
    return error;
  }
};

const loginUpdate = async (userId: string) => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      lastLogin: new Date(),
    },
  });
};

export default {
  createUser,
  getUser,
  deleteUser,
  updateProfile,
  createProfile,
  loginUpdate,
  getUserById,
};
