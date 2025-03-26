import { useEffect, useState } from "react";
import { CurrentUserContext, CurrentUser } from "./CurrentUserContext";
import user from "../fetchers/user";

export default function UserContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    id: "",
    username: "",
    success: false,
  });

  useEffect(() => {
    async function fetchUser() {
      const verifiedUser = await user.verifyToken();
      if (verifiedUser.success) {
        setCurrentUser(verifiedUser);
      }
    }
    fetchUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
