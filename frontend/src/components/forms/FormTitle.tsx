import "./forms.css";
import "../genCSS/typewriter.css";

//Typewriter effect for the title of the form
export default function FormTitle({ title }: { title: string }) {
  return (
    <div className="titleContainer">
      <span className="typewriter formTitle">{title}</span>
    </div>
  );
}
