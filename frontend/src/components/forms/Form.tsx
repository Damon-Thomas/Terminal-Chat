import "./forms.css";
import { FormEvent, ReactNode } from "react";

export default function Form({
  children,
  onSubmit,
}: {
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form className="formWrapper" onSubmit={onSubmit}>
      {children}
    </form>
  );
}
