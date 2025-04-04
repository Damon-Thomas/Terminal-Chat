import { Link } from "react-router";
import { CurrentConvoContext } from "../../context/CurrentConvoContext";
import { useContext } from "react";
import contactActions from "../../context/ContactActions";
import Button from "../Buttons/Button";

export default function GoToButton({
  children,
  destination,
  id,
  username,
  group,
  message = true,
  className = "",
}: {
  children: string;
  destination: string;
  id: string;
  username: string;
  group: boolean;
  message?: boolean;
  className?: string;
}) {
  const handleClick = () => {
    if (message) {
      contactActions.storeContact({ id, username, group: group });
    }
    location.href = destination;
  };

  return (
    <Button size="small" onClick={handleClick} className={`${className}`}>
      {children}
    </Button>
  );
}
