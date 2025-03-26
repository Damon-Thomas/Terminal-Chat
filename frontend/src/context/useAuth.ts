import { useContext, useMemo } from "react";
import { CurrentUserContext } from "./CurrentUserContext"; // Import the CurrentUserContext

export default function useAuth() {
  const context = useContext(CurrentUserContext);

  // Memoize the returned object to prevent unnecessary re-renders
  return useMemo(
    () => ({
      user: context.currentUser,
      isAuthenticated: !!context.currentUser,
      // other auth properties
    }),
    [context.currentUser]
  );
}
