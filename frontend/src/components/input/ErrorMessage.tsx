import initTypewriter from "../../utils/typewriter.ts";
import { useEffect } from "react";
import "./errorMessage.css";

export default function ErrorMessage({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  useEffect(() => {
    initTypewriter();
  }, [children]);

  return (
    <div className={`errorWrapper ${className}`}>
      <p className="error-message typewriter system fast">{children}</p>
    </div>
  );
}
