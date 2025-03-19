import "./input.css";

export default function Input({
  type,
  className,
  id,
  name,
}: {
  type: string;
  className: string;
  id: string;
  name: string;
}) {
  return (
    <input
      type={type}
      className={className + "input-box"}
      id={id}
      name={name}
    />
  );
}
