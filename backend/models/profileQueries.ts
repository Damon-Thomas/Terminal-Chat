import prisma from "./client.js";

const getProfile = async (userId: string) => {
  console.log("getProfile", userId);
  return await prisma.profile.findUnique({
    where: {
      id: userId,
    },
  });
};

interface Profile {
  bio: string;
  intro: string;
}

const updateProfile = async (userId: string, profile: Profile) => {
  console.log("updateProfile", userId, profile);
  return await prisma.profile.update({
    where: {
      id: userId,
    },
    data: {
      bio: profile.bio,
      intro: profile.intro,
    },
  });
};

export default {
  getProfile,
  updateProfile,
};
