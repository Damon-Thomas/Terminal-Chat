import "./forms.css";
import { FormEvent, ReactNode } from "react";

export default function Form({
  children,
  onSubmit,
  className = "",
}: {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  className?: string;
}) {
  return (
    <form className={`formWrapper ${className}`} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
