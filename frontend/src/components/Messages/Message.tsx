export default function Message({
  content,
  username,
  user,
}: {
  content: string;
  username: string;
  user: boolean;
}) {
  return (
    <div
      className={`message ${
        user ? "user-glitch-message" : "glitch-received-message"
      }`}
    >
      <p className="message-content">{content}</p>
      <p className="message-username">{username}</p>
    </div>
  );
}
