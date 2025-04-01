import "./input.css";

export default function Input({
  type = "text",
  className = "",
  id,
  name,
  required = false,
  placeholder = "",
  onChange = () => {},
}: {
  type?: string;
  className?: string;
  id: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type={type}
      className={className + " input-box"}
      id={id}
      name={name}
      required={required}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
