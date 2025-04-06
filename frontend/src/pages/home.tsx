import {
  CurrentUserContext,
  CurrentUserContextType,
} from "../context/CurrentUserContext.ts";
import user from "../fetchers/user.ts";
import { useContext, useEffect } from "react";
import NonUserHome from "./subPages/NonUserHome.tsx";
import UserHomePage from "./subPages/UserHomePage.tsx";

export default function Home() {
  const { currentUser, setCurrentUser } = useContext(
    CurrentUserContext
  ) as CurrentUserContextType;

  function authUser() {
    console.log();
    location.href = "/auth";
  }

  useEffect(() => {
    user
      .verifyToken()
      .then((user) => {
        if (user.success) {
          setCurrentUser(user);
        } else {
          console.log("Error verifying token");
          authUser();
          return;
        }
      })
      .catch((err) => {
        console.error("Error during token verification:", err);
        authUser();
        return;
      });
  }, [setCurrentUser]);

  return (
    <>
      {currentUser && currentUser.username ? (
        <div>
          <UserHomePage username={currentUser.username} />
        </div>
      ) : (
        <div>
          <NonUserHome />
        </div>
      )}
    </>
  );
}
