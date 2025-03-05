import prisma from "./client.js";

const createUser = async (username: string, password: string) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: password,
      },
    });
    try {
      await createProfile(newUser.id, username);
      return newUser;
    } catch (error) {
      console.log("Error creating profile: ", error);
      deleteUser(username);
      return error;
    }
  } catch (error) {
    console.log("Error creating user: ", error);
    return error;
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
//later add functionality to delete user files
//delete cloud files
const deleteUser = async (username: string) => {
  const user = await getUser(username);
  let stepsCompleted = 0;
  if (!user) {
    return user;
  } else {
    try {
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
          sentId: user.id,
        },
      });
      stepsCompleted++;

      //delete user from groups
      await prisma.group.updateMany({
        where: {
          members: {
            has: user.id,
          },
        },
        data: {
          members: {
            disconnect: { id: user.id },
          },
        },
      });
      stepsCompleted++;

      //delete user from friends lists
      await prisma.user.updateMany({
        where: {
          friends: {
            has: user.id,
          },
        },
        data: {
          friends: {
            disconnect: { id: user.id },
          },
        },
      });
      stepsCompleted++;

      //remove likes from messages
      await prisma.message.updateMany({
        where: {
          likes: {
            has: user.id,
          },
        },
        data: {
          likes: {
            disconnect: { id: user.id },
          },
        },
      });
      stepsCompleted++;

      //remove user profile
      await prisma.profile.delete({
        where: {
          userId: user.id,
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

      return true;
    } catch (error) {
      console.log(
        "Error profile completely: Please try again",
        "   Deletions complete:",
        stepsCompleted,
        error
      );
      return error;
    }
  }
};

const createProfile = async (userId: string, username: string) => {
  try {
    await prisma.profile.create({
      data: {
        userId: userId,
        name: username,
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
  try {
    await prisma.profile.update({
      where: {
        userId: userId,
      },
      data: {
        lastLogin: new Date(),
      },
    });
  } catch (error) {
    console.log("Error updating profile: ", error);
    return error;
  }
};
export default {
  createUser,
  getUser,
  deleteUser,
  updateProfile,
  createProfile,
};
