import MessageArea from "../components/Messages/MessageArea";
import MessageSideBar from "./sidebar/MessageSideBar";
import "./pageStyles/messagePageStyles.css";
import { useCallback, useEffect, useRef, useState } from "react";
import getMessages from "../fetchers/getMessages";
import MessageCreator from "../components/Messages/MessageCreator";
import Message from "../components/Messages/Message";
import useAuth from "../context/useAuth";
import contactActions, { Contact } from "../context/ContactActions";

export type Message = {
  id: string;
  createdAt: string;
  content: string;
  authorId: string;
  username: string;
  likes: string[];
  PinnedMessage: boolean;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const group = selectedContact?.group;
  // Get user data once and store in a ref
  const { user } = useAuth();
  const userRef = useRef(user);

  // Update ref if user changes
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  const fetchMessages = useCallback(async (contactId: string) => {
    const retrieved = await getMessages.getUserToUserMessages(contactId);
    if (retrieved) {
      console.log("retrieved", retrieved);
      setMessages(retrieved.messages);
    } else {
      console.log("Error getting messages");
      setMessages([]);
    }
  }, []);

  useEffect(() => {
    const storedContact = contactActions.getStoredContact();
    setSelectedContact(storedContact);
  }, []);

  useEffect(() => {
    if (selectedContact) {
      fetchMessages(selectedContact.id);
    } else {
      setMessages([]);
    }
  }, [selectedContact, fetchMessages]);

  return (
    <div className="messageMain">
      <MessageSideBar></MessageSideBar>
      <MessageArea>
        {selectedContact ? (
          <div>
            {group && selectedContact.username ? (
              <h1>{selectedContact.username}</h1>
            ) : (
              <h1>Messages with {selectedContact.username}</h1>
            )}
            {messages.map((message) => (
              <Message
                key={message.id}
                content={message.content}
                username={message.username}
                user={user.id === message.authorId}
              ></Message>
            ))}
            <h1>You are {user.username}</h1>
            <MessageCreator
              group={group || false}
              username={user.username}
              messageSentTo={selectedContact ? selectedContact.id : ""}
              messages={messages}
              setMessages={setMessages}
            ></MessageCreator>
          </div>
        ) : null}
      </MessageArea>
    </div>
  );
}
