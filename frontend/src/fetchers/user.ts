const signUp = async (username: string, password: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_ApiHost}/user/createUser`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }
  );
  const data = await response.json();
  if (await data.token) {
    saveToken(data.token);
  }
  return { id: data.id, username: data.username, success: data.success };
};

const logIn = async (username: string, password: string) => {
  const response = await fetch(`${import.meta.env.VITE_ApiHost}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  if (await data.token) {
    saveToken(data.token);
  }
  return { id: data.id, username: data.username, success: data.success };
};

const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};

const verifyToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  const response = await fetch(`${import.meta.env.VITE_ApiHost}/user/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export default {
  signUp,
  logIn,
  verifyToken,
};
