import "./messages.css";
import { ReactNode } from "react";

type MessageContainerProps = {
  children: ReactNode;
};

export default function MessageContainer({ children }: MessageContainerProps) {
  return <div className="displayMessages">{children}</div>;
}
