import { createContext } from "react";

export interface ConvoContext {
  id: string;
  username: string;
  group: boolean;
}

export interface CurrentConvoContextType {
  selectedContact: { id: string; username: string; group: boolean };
  setSelectedContact: React.Dispatch<
    React.SetStateAction<{ id: string; username: string; group: boolean }>
  >;
}
export const CurrentConvoContext =
  createContext<CurrentConvoContextType | null>(null);
