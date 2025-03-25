const createMessage = async (
  message: string,
  sentTo: string,
  destinationType: "Group" | "User"
) => {
  const response = await fetch(
    `${import.meta.env.VITE_ApiHost}/action/createMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ message, sentTo, destinationType }),
    }
  );
  return response.json();
};

const likeMessage = async (messageId: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_ApiHost}/action/likeMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ messageId }),
    }
  );
  return response.json();
};

const unLikeMessage = async (messageId: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_ApiHost}/action/unLikeMessage`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ messageId }),
    }
  );
  return response.json();
};

const addFriend = async (friendId: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_ApiHost}/action/addFriend`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ friendId }),
    }
  );
  return response.json();
};

const removeFriend = async (friendId: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_ApiHost}/action/removeFriend`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ friendId }),
    }
  );
  return response.json();
};

const createGroup = async (groupName: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_ApiHost}/action/createGroup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ groupName }),
    }
  );
  return response.json();
};

const joinGroup = async (groupId: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_ApiHost}/action/joinGroup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ groupId }),
    }
  );
  return response.json();
};

const leaveGroup = async (groupId: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_ApiHost}/action/leaveGroup`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ groupId }),
    }
  );
  return response.json();
};

export default {
  createMessage,
  likeMessage,
  unLikeMessage,
  addFriend,
  removeFriend,
  createGroup,
  joinGroup,
  leaveGroup,
};
