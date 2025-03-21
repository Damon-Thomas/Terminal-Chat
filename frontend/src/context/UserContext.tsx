import { useState } from "react";
import { CurrentUserContext, CurrentUser } from "./CurrentUserContext";

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

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
