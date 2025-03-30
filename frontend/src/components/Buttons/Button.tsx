import "./button.css";

export default function Button({
  children,
  className = "",
  onClick = () => {},
  type = "button",
  size = "small",
  color = "default",
}: {
  children: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  size?: "small" | "medium" | "large";
  color?: "default" | "primary" | "secondary";
}) {
  return (
    <button
      type={type}
      className={`${className} button ${size} ${color}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
