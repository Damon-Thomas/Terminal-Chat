const createMessage = async (message: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_ApiHost}/actions/createMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    }
  );
  return response.json();
};
