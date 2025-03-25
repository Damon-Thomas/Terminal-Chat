import "./messages.css";

interface MessageAreaProps {
  children: React.ReactNode;
}

export default function MessageArea({ children }: MessageAreaProps) {
  return (
    <div className="messageArea">
      {children || (
        <div className="messageArea">
          <h1>Use Sidebar to Select Contact to Message</h1>
        </div>
      )}
    </div>
  );
}

MessageArea.defaultProps = {
  children: (
    <div className="messageArea">
      <h1>Use Sidebar to Select Contact to Message</h1>
    </div>
  ),
};
