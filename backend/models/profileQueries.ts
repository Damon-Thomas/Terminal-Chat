import prisma from "./client.js";

const getProfile = async (userId: string) => {
  return await prisma.profile.findUnique({
    where: {
      id: userId,
    },
  });
};

interface Profile {
  color: string;
  profilePic: string;
  bio: string;
  intro: string;
}

const updateProfile = async (userId: string, profile: Profile) => {
  if (profile.color.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/)) {
    return await prisma.profile.update({
      where: {
        id: userId,
      },
      data: {
        color: profile.color,
        bio: profile.bio,
        intro: profile.intro,
        profilePic: profile.profilePic,
      },
    });
  }
};

export default {
  getProfile,
  updateProfile,
};
