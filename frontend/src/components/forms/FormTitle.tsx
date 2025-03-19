import "./forms.css";
import "../genCSS/typewriter.css";
import initTypewriter from "../../utils/typewriter.js";
import { useEffect } from "react";

//Typewriter effect for the title of the form
export default function FormTitle({ title }: { title: string }) {
  useEffect(() => {
    initTypewriter();
  }, []);

  return (
    <div className="titleContainer">
      <span className="typewriter formTitle">{title}</span>
    </div>
  );
}
