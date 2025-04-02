const getProfile = async (userId: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_ApiHost}/profile/getProfile`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ userId }),
    }
  );
  console.log("response", response);
  return await response.json();
};

const editProfile = async (profile: {
  color: string;
  profilePic: string;
  bio: string;
  intro: string;
}) => {
  const response = await fetch(
    `${import.meta.env.VITE_ApiHost}/profile/updateProfile`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ ...profile }),
    }
  );
  return await response.json();
};

export default { getProfile, editProfile };
