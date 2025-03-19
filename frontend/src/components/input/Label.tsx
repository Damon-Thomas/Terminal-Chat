import "./input.css";

export default function Label({
  htmlFor,
  text,
  className,
}: {
  htmlFor: string;
  text: string;
  className: string;
}) {
  return (
    <label className={className + " label"} htmlFor={htmlFor}>
      {text}
    </label>
  );
}
