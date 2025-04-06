import contactActions from "../../context/contactActions";
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
