import "./messages.css";

interface MessageAreaProps {
  children: React.ReactNode;
}

export default function MessageArea({ children }: MessageAreaProps) {
  return (
    <div className="messageArea">
      {children || (
        <div className="messageAreaDefault">
          <h1>
            Use Sidebar to Select Who to Message (On mobile use the icon at the
            top left to open the sidebar)
          </h1>
        </div>
      )}
    </div>
  );
}

MessageArea.defaultProps = {
  children: (
    <div className="messageArea">
      <h1>
        Use Sidebar to Select Who to Message (On mobile use the icon at the top
        left to open the sidebar)
      </h1>
    </div>
  ),
};
