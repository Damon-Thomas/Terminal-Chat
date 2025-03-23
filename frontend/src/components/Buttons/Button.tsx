import "./button.css";

export default function Button({
  children,
  className = "",
  onClick = () => {},
  type = "button",
}: {
  children: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button type={type} className={`${className} button`} onClick={onClick}>
      {children}
    </button>
  );
}
