import "./forms.css";

export default function Form({ children }: { children: React.ReactNode }) {
  return <form className="formWrapper">{children}</form>;
}
