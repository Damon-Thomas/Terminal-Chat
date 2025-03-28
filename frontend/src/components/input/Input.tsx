import "./input.css";

export default function Input({
  type,
  className = "",
  id,
  name,
  required = false,
  placeholder = "",
}: {
  type: string;
  className?: string;
  id: string;
  name: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <input
      type={type}
      className={className + " input-box"}
      id={id}
      name={name}
      required={required}
      placeholder={placeholder}
    />
  );
}
