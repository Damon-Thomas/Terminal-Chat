import { useEffect } from "react";
import "./input.css";
import initTypewriter from "../../utils/typewriter.js";

export default function Label({
  htmlFor,
  text,
  className = "",
}: {
  htmlFor: string;
  text: string;
  className?: string;
}) {
  useEffect(() => {
    initTypewriter();
  }, []);
  return (
    <label className={className + " label "} htmlFor={htmlFor}>
      {text}
    </label>
  );
}
