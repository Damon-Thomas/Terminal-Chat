import MessageArea from "../components/Messages/MessageArea";
import MessageSideBar from "./sidebar/MessageSideBar";
import "./pageStyles/messagePageStyles.css";

export default function MessagesPage() {
  return (
    <div className="messageMain">
      <MessageSideBar />
      <MessageArea />
    </div>
  );
}
