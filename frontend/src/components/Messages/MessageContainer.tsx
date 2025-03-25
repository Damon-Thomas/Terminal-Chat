import { useContext, useEffect, useState } from "react";
import {
  CurrentUserContext,
  CurrentUserContextType,
} from "../../context/CurrentUserContext";
import getMessages from "../../fetchers/getMessages";
import Message from "./Message";

export default function MessageContainer({
  group = false,
  id,
}: {
  group?: boolean;
  id: string;
}) {
  //messages should be sorted by date
  interface Message {
    messageId: string;
    content: string;
    authorId: string;
  }

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    async function getUserMessages() {
      const messages = await getMessages.getUserToUserMessages(id);
      if (messages) {
        setMessages(messages);
      } else {
        setMessages([]);
        console.log("Error getting messages");
      }
    }
    async function getGroupMessages() {
      const messages = await getMessages.getGroupMessages(id);
      if (messages) {
        setMessages(messages);
      } else {
        setMessages([]);
        console.log("Error getting messages");
      }
    }
    if (group) {
      getGroupMessages();
    } else {
      getUserMessages();
    }
  }, [group, id]);

  const { currentUser } = useContext(
    CurrentUserContext
  ) as CurrentUserContextType;

  return (
    <div className="h-screen w-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-lg md:text-2xl lg:text-4xl">Messages</h1>
      <div className="h-4/5 w-4/5 border-2 border-black">
        {messages.map((message) => (
          <Message
            key={message.messageId}
            content={message.content}
            authorId={message.authorId}
            user={message.authorId === currentUser.id ? true : false}
          />
        ))}
      </div>
    </div>
  );
}
