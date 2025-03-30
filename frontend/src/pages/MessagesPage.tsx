import MessageArea from "../components/Messages/MessageArea";
import MessageSideBar from "./sidebar/MessageSideBar";
import "./pageStyles/messagePageStyles.css";
import { useCallback, useEffect, useRef, useState } from "react";
import getMessages from "../fetchers/getMessages";
import MessageCreator from "../components/Messages/MessageCreator";
import Message from "../components/Messages/Message";
import useAuth from "../context/useAuth";
import contactActions, { Contact } from "../context/ContactActions";
import MessageContainer from "../components/Messages/MessageContainer";

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

  const fetchMessages = useCallback(
    async (contactId: string, group: boolean) => {
      if (!contactId) {
        console.log("No contactId provided");
        return;
      }
      let retrieved;
      if (!group) {
        retrieved = await getMessages.getUserToUserMessages(contactId);
      } else {
        retrieved = await getMessages.getGroupMessages(contactId);
      }
      if (retrieved) {
        console.log("retrieved", retrieved);
        setMessages(retrieved.messages);
      } else {
        console.log("Error getting messages");
        setMessages([]);
      }
    },
    []
  );

  useEffect(() => {
    const storedContact = contactActions.getStoredContact();
    setSelectedContact(storedContact);
  }, []);

  useEffect(() => {
    if (selectedContact) {
      fetchMessages(selectedContact.id, selectedContact.group);
    } else {
      setMessages([]);
    }
  }, [selectedContact, fetchMessages]);

  return (
    <div className="relative flex w-full h-full overflow-hidden">
      <MessageSideBar setSelectedContact={setSelectedContact} />
      <div className="flex-1 overflow-hidden">
        <MessageArea>
          {selectedContact ? (
            <div className="messageBox">
              <MessageContainer>
                {group && selectedContact.username ? (
                  <p>{selectedContact.username}</p>
                ) : (
                  <p>Messages with {selectedContact.username}</p>
                )}
                {messages.map((message) => (
                  <Message
                    key={message.id}
                    content={message.content}
                    username={message.username}
                    user={user.id === message.authorId}
                  ></Message>
                ))}
              </MessageContainer>
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
    </div>
  );
}
