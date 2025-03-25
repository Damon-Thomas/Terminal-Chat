export default function Message({
  content,
  authorId,
  user,
}: {
  content: string;
  authorId: string;
  user: boolean;
}) {
  return (
    <div className={`message ${user ? "userMessage" : "otherMessage"}`}>
      <p>{content}</p>
      <p>{authorId}</p>
    </div>
  );
}
