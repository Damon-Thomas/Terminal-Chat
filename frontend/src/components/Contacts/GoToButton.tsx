import { Link } from "react-router";
import { CurrentConvoContext } from "../../context/CurrentConvoContext";
import { useContext } from "react";
import contactActions from "../../context/ContactActions";

export default function GoToButton({
  children,
  destination,
  id,
  username,
  group,
  message = true,
}: {
  children: string;
  destination: string;
  id: string;
  username: string;
  group: boolean;
  message?: boolean;
}) {
  const handleClick = () => {
    if (message) {
      contactActions.storeContact({ id, username, group: group });
    }
  };

  return (
    <Link to={destination}>
      <button onClick={handleClick} className="button">
        {children}
      </button>
    </Link>
  );
}
