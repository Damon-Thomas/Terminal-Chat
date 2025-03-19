import "./input.css";

export default function InputWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="inputWrapper">{children}</div>;
}
