const getFriendsList = async () => {
  const friends = await fetch(
    `${import.meta.env.VITE_ApiHost}/contacts/getFriendsList`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return friends.json();
};

const getActiveUserContacts = async () => {
  const users = await fetch(
    `${import.meta.env.VITE_ApiHost}/contacts/activeUserContacts`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return users.json();
};

const getUserGroups = async () => {
  const groups = await fetch(
    `${import.meta.env.VITE_ApiHost}/contacts/getGroups`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
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
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ page }),
    }
  );
  return users.json();
};

const getNonJoinedGroups = async () => {
  const groups = await fetch(
    `${import.meta.env.VITE_ApiHost}/contacts/getNonJoinedGroups`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
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
