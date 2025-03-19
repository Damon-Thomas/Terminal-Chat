import "./input.css";

export default function Input({
  type,
  className,
  id,
  name,
  required = false,
}: {
  type: string;
  className: string;
  id: string;
  name: string;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      className={className + "input-box"}
      id={id}
      name={name}
      required={required}
    />
  );
}
