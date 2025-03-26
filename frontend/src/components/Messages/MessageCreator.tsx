import { useContext, useState } from "react";
import useAuth from "../../context/useAuth";
import LongInput from "../input/LongInput";
import Button from "../Buttons/Button";
import ErrorMessage from "../input/errorMessage";
import Form from "../forms/Form";
import sendActions from "../../fetchers/sendActions";
import type { Message } from "../../pages/MessagesPage";

export default function MessageCreator({
  group = false,
  messageSentTo,
  messages,
  setMessages,
}: {
  group: boolean;
  messageSentTo: string;
  messages: Array<Message>;
  setMessages: React.Dispatch<React.SetStateAction<Array<Message>>>;
}) {
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const [error, setError] = useState("");

  async function sendMessage() {
    const response = await sendActions.createMessage(
      content,
      messageSentTo,
      group ? "Group" : "User"
    );
    if (response.success) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: response.data.id,
          createdAt: new Date().toISOString(),
          content,
          authorId: user.id,
          likes: [],
          PinnedMessage: false,
        },
      ]);
      setContent("");
    } else {
      setError(response.error || "Failed to send message");
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.length > 500) {
      setError("Message is too long");
      return;
    } else if (content.length < 1) {
      setError("Message is too short");
      return;
    }

    await sendMessage();
  };

  return (
    <Form onSubmit={handleSubmit} className="messageCreator">
      <LongInput
        name="messageInput"
        id="messageInput"
        rows={3}
        value={content}
        setValue={setContent}
        placeholder="Type a message..."
        className="messageInput"
      />
      <Button type="submit" className="messageButton">
        Send
      </Button>
      <ErrorMessage>{error}</ErrorMessage>
    </Form>
  );
}
