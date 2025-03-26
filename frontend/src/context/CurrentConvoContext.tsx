import { createContext } from "react";

export interface ConvoContext {
  id: string;
  username: string;
}

export interface CurrentConvoContextType {
  selectedContact: { id: string; username: string };
  setSelectedContact: React.Dispatch<
    React.SetStateAction<{ id: string; username: string }>
  >;
}
export const CurrentConvoContext =
  createContext<CurrentConvoContextType | null>(null);
