import { Link } from "react-router";
import { CurrentConvoContext } from "../../context/CurrentConvoContext";
import { useContext } from "react";

export default function GoToMessages({
  destination,
  id,
  username,
}: {
  destination: string;
  id: string;
  username: string;
}) {
  const { setSelectedContact } = useContext(CurrentConvoContext)!;
  const handleClick = () => {
    setSelectedContact({ id, username });
  };

  return (
    <Link to={destination}>
      <button onClick={handleClick} className="button">
        Go to Messages
      </button>
    </Link>
  );
}
