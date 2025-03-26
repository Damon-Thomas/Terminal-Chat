import MessageArea from "../components/Messages/MessageArea";
import MessageSideBar from "./sidebar/MessageSideBar";
import "./pageStyles/messagePageStyles.css";
import { useCallback, useContext, useEffect, useState } from "react";
import getMessages from "../fetchers/getMessages";
import MessageCreator from "../components/Messages/MessageCreator";
import Message from "../components/Messages/Message";
import useAuth from "../context/useAuth";
import contactActions from "../context/ContactActions";

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
  const selectedContact = contactActions.getStoredContact();
  const group = selectedContact?.group;
  const { user } = useAuth();

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
      console.log(
        "selectedContact",
        selectedContact.id,
        selectedContact.username
      );

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
                content={message.content}
                authorId={message.authorId}
                user={user.id === message.authorId}
              ></Message>
            ))}
            <MessageCreator
              group={group || false}
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
