import "./input.css";

export default function InputWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`inputWrapper ${className}`}>{children}</div>;
}
