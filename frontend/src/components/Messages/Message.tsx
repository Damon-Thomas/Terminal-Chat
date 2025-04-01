import ContactActions from "../../context/ContactActions";

export default function Message({
  content,
  username,
  user,
  id,
  createdAt,
}: {
  content: string;
  username: string;
  user: boolean;
  id: string;
  createdAt: string;
}) {
  function goToProfileHandler() {
    ContactActions.storeContact({
      id: id,
      username: username,
      group: false,
    });

    window.location.href = "/profile";
  }

  return (
    <div
      className={`message ${
        user ? "user-glitch-message" : "glitch-received-message"
      }`}
    >
      <p className="message-content">{content}</p>

      <p className="message-username" onClick={goToProfileHandler}>
        {username} sent at {createdAt}
      </p>
    </div>
  );
}
