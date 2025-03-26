import "./button.css";

export default function Button({
  children,
  className = "",
  onClick = () => {},
  type = "button",
  size = "medium",
}: {
  children: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  size?: "small" | "medium" | "large";
}) {
  return (
    <button
      type={type}
      className={`${className} button ${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
