import MessageArea from "../components/Messages/MessageArea";
import MessageSideBar from "./sidebar/MessageSideBar";
import "./pageStyles/messagePageStyles.css";
import { useCallback, useEffect, useState } from "react";
import getMessages from "../fetchers/getMessages";

type Contact =
  | { id: string; username: string; groupName?: never } // User object
  | { id: string; groupName: string; username?: never }; // Group object

export type Message = {
  id: string;
  createdAt: string;
  content: string;
  authorId: string;
  likes: string[];
  PinnedMessage: boolean;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [group, setGroup] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const fetchMessages = useCallback(async () => {
    if (group && selectedContact) {
      const retrieved = await getMessages.getGroupMessages(selectedContact.id);
      if (retrieved) {
        setMessages(retrieved);
      } else {
        console.log("Error getting messages");
        setMessages([]);
      }
    } else if (selectedContact) {
      const retrieved = await getMessages.getUserToUserMessages(
        selectedContact.id
      );
      if (retrieved) {
        setMessages(retrieved);
      } else {
        console.log("Error getting messages");
        setMessages([]);
      }
    } else {
      console.log("No selected contact");
      setMessages([]);
    }
  }, [group, selectedContact]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return (
    <div className="messageMain">
      <MessageSideBar setSelectedContact={setSelectedContact}></MessageSideBar>
      <MessageArea>
        {selectedContact ? (
          <div>
            {group && selectedContact.groupName ? (
              <h1>{selectedContact.groupName}</h1>
            ) : (
              <h1>Messages with {selectedContact.username}</h1>
            )}
            {messages.map((message) => (
              <div className="message">
                <p>{message.content}</p>
                <p>{message.authorId}</p>
              </div>
            ))}
          </div>
        ) : null}
      </MessageArea>
    </div>
  );
}
