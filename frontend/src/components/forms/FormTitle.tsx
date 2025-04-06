import "./forms.css";
import "../genCSS/typewriter.css";
import initTypewriter from "../../utils/typewriter.ts";
import { useEffect } from "react";

//Typewriter effect for the title of the form
export default function FormTitle({
  title,
  className = "",
}: {
  title: string;
  className?: string;
}) {
  useEffect(() => {
    initTypewriter();
  }, []);

  return (
    <div className={`${className} titleContainer`}>
      <span className="typewriter default formTitle">{title}</span>
    </div>
  );
}
