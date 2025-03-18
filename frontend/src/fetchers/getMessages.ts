const getUserToUserMessages = async (otherUserId: string) => {
  const messages = await fetch(
    `${import.meta.env.VITE_ApiHost}/messages/getMessagesBetweenUsers`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        sentToId: otherUserId,
      }),
    }
  );
  return messages.json();
};

const getGroupMessages = async (groupId: string) => {
  const messages = await fetch(
    `${import.meta.env.VITE_ApiHost}/messages/getMessagesToGroup`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        groupId: groupId,
      }),
    }
  );
  return messages.json();
};
export default { getUserToUserMessages, getGroupMessages };
