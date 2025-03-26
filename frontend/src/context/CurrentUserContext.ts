import { createContext } from "react";

export interface CurrentUser {
  id: string;
  username: string;
  success: boolean;
}

export interface CurrentUserContextType {
  currentUser: CurrentUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
}
export const CurrentUserContext = createContext<CurrentUserContextType>(
  {} as CurrentUserContextType
);
