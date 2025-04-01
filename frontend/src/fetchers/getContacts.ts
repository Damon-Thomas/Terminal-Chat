const getFriendsList = async (page: number) => {
  const friends = await fetch(
    `${import.meta.env.VITE_ApiHost}/contacts/getFriendsList`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ page }),
    }
  );
  if (friends.ok) {
    const data = await friends.json();
    if (!data.failure) {
      return data.friends;
    }
  } else {
    console.log("Error getting friends list");
    return [];
  }
};

const getActiveUserContacts = async (page: number) => {
  const users = await fetch(
    `${import.meta.env.VITE_ApiHost}/contacts/activeUserContacts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ page }),
    }
  );
  return users.json();
};

const getUserGroups = async (page: number) => {
  const groups = await fetch(
    `${import.meta.env.VITE_ApiHost}/contacts/getGroups`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ page }),
    }
  );
  return groups.json();
};

const getGroupMembers = async (groupId: string) => {
  const members = await fetch(
    `${import.meta.env.VITE_ApiHost}/contacts/getGroupMembers`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ groupId }),
    }
  );
  return members.json();
};

const getNonContactUsers = async (page: number) => {
  const users = await fetch(
    `${import.meta.env.VITE_ApiHost}/contacts/getNonContactUsers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ page }),
    }
  );
  return users.json();
};

const getNonJoinedGroups = async (page: number) => {
  const groups = await fetch(
    `${import.meta.env.VITE_ApiHost}/contacts/getNonJoinedGroups`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ page }),
    }
  );
  return groups.json();
};

export default {
  getFriendsList,
  getActiveUserContacts,
  getUserGroups,
  getGroupMembers,
  getNonContactUsers,
  getNonJoinedGroups,
};
