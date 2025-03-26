import { useState } from "react";
import { CurrentConvoContext } from "./CurrentConvoContext";

type Contact = { id: string; username: string; group: boolean };

export default function ConvoContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedContact, setSelectedContact] = useState<Contact>({
    id: "",
    username: "",
    group: false,
  });

  return (
    <CurrentConvoContext.Provider
      value={{ selectedContact, setSelectedContact }}
    >
      {children}
    </CurrentConvoContext.Provider>
  );
}
