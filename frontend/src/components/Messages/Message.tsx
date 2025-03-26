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
    <div className={`message ${user ? "userMessage" : "otherMessage"}`}>
      <p>{content}</p>
      <p>{username}</p>
    </div>
  );
}
