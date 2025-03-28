import "./input.css";

export default function LongInput({
  rows = 3,
  className = "",
  id,
  name,
  value,
  setValue,
  required = false,
  placeholder = "",
}: {
  rows?: number;
  className?: string;
  id: string;
  name: string;
  value: string;
  setValue: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <textarea
      rows={rows}
      className={`${className} input-box`}
      id={id}
      name={name}
      required={required}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchEnd={(e) => {
        e.stopPropagation();
        (e.target as HTMLTextAreaElement).focus();
      }}
    />
  );
}
