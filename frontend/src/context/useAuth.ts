import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext"; // Import the CurrentUserContext

const useAuth = () => {
  const context = useContext(CurrentUserContext); // Remove explicit type as it's inferred
  if (!context) {
    throw new Error(
      "useAuth must be used within a CurrentUserContext.Provider"
    );
  }
  const { currentUser } = context;
  return { currentUser };
};

export default useAuth;
