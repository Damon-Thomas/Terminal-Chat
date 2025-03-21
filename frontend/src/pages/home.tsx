import { Outlet } from "react-router-dom";
import {
  currentUser,
  CurrentUserContext,
  CurrentUserContextType,
} from "../context/CurrentUserContext.ts";
import user from "../fetchers/user.ts";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { currentUser, setCurrentUser } = useContext(
    CurrentUserContext
  ) as CurrentUserContextType;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    user
      .verifyToken()
      .then((user) => {
        if (user.success) {
          setCurrentUser(user);
        } else {
          console.log("Error verifying token");
        }
      })
      .catch((err) => {
        console.error("Error during token verification:", err);
      });
    // Check if user is logged in
    // If user is logged in, setCurrentUser
    // If user is not logged in, redirect to login page
    // If user is not logged in, redirect to signup page
  }, [setCurrentUser]);
  return currentUser && currentUser.id !== "" ? (
    <div>
      <h1>Logged in</h1>
      <Outlet />
    </div>
  ) : (
    <div>
      <h1>Not Logged in</h1>
      <Outlet />
    </div>
  );
}
