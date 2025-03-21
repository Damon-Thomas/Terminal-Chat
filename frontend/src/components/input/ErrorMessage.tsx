import initTypewriter from "../../utils/typewriter.js";
import { useEffect } from "react";
import "./errorMessage.css";

export default function ErrorMessage({ children }: { children: string }) {
  useEffect(() => {
    initTypewriter();
  }, [children]);

  return (
    <div className="errorWrapper">
      <p className="error-message typewriter system fast">{children}</p>
    </div>
  );
}
