import React, { useEffect } from "react";
import "./sidebarStyles.css";
import SideItem from "./SideItem";
import getContacts from "../../fetchers/getContacts";
import SideTitle from "./SideTitle";
import contactActions from "../../context/ContactActions";

type Contact = { id: string; username: string; group: boolean };

type Group = {
  id: string;
  groupName: string;
};

type Convo = {
  id: string;
  username: string;
  groupName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadMessages: number;
};

export default function MessageSideBar() {
  const [trigger, setTrigger] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [groups, setGroups] = React.useState([]);
  const [groupSelection, setGroupSelection] = React.useState<Group[]>([]);
  const [groupPage, setGroupPage] = React.useState(1);
  const [convos, setConvos] = React.useState([]);
  const [convoSelection, setConvoSelection] = React.useState<Convo[]>([]);
  const [convoPage, setConvoPage] = React.useState(1);

  const groupClickHandler = (group: Group) => {
    contactActions.storeContact({
      id: group.id,
      username: group.groupName,
      group: true,
    });
  };

  const convoClickHandler = (convo: Convo) => {
    contactActions.storeContact({
      id: convo.id,
      username: convo.username,
      group: false,
    });
  };

  useEffect(() => {
    async function fetchGroups() {
      const fetchedGroups = await getContacts.getUserGroups();
      if (fetchedGroups.success) {
        setGroups(fetchedGroups.groups);
      }
    }
    async function fetchConvos() {
      const convos = await getContacts.getActiveUserContacts();
      if (convos.success) {
        setConvos(convos.contacts);
      }
    }
    fetchGroups();
    fetchConvos();
  }, []);

  useEffect(() => {
    function updateGroupSelection() {
      const selection = groups.slice(groupPage * 5 - 5, groupPage * 5);
      console.log("Group selection", selection, selection.length, groupPage);
      if (selection.length === 0 && groupPage > 1) {
        console.log("Updating group page");
        setGroupPage((prev) => prev - 1);
        updateGroupSelection();
      } else {
        setGroupSelection(selection);
      }
    }
    function updateConvoSelection() {
      const selection = convos.slice(convoPage * 5 - 5, convoPage * 5);
      if (selection.length === 0 && convoPage > 1) {
        setConvoPage((prev) => prev - 1);
        updateConvoSelection();
      } else {
        setConvoSelection(selection);
      }
    }
    updateGroupSelection();
    updateConvoSelection();
  }, [groupPage, convoPage, groups, convos]);

  return (
    <div className="sidebarOverlay">
      <div className={`sidebar ${trigger ? "openBar" : "closedBar"}`}>
        <aside className="barContent">
          <div className="barContent">
            <SideTitle>Groups</SideTitle>
            {groupSelection.map((group, index) => (
              <SideItem
                clickHandler={() => groupClickHandler(group)}
                key={index}
              >
                {group.groupName}
              </SideItem>
            ))}
            <div className="pageNav">
              <button
                onClick={() => setGroupPage((prev) => prev - 1)}
                disabled={groupPage === 0}
              >
                Prev
              </button>
              <button
                onClick={() => setGroupPage((prev) => prev + 1)}
                disabled={groupPage * 5 + 5 >= groups.length}
              >
                Next
              </button>
            </div>
            <SideTitle>Conversations</SideTitle>
            {convoSelection.map((convo, index) => (
              <SideItem
                clickHandler={() => convoClickHandler(convo)}
                key={index}
              >
                {convo.username}
              </SideItem>
            ))}
            <div className="pageNav">
              <button
                onClick={() => setConvoPage((prev) => prev - 1)}
                disabled={convoPage === 0}
              >
                Prev
              </button>
              <button
                onClick={() => setConvoPage((prev) => prev + 1)}
                disabled={convoPage * 5 + 5 >= convos.length}
              >
                Next
              </button>
            </div>
          </div>
        </aside>
      </div>

      <div className={`triggerIcon ${!trigger ? "closed" : ""}`}>
        <button
          onClick={() => {
            setTrigger(!trigger);
            setOpen(!open);
          }}
        >
          <svg
            className={`w-6 h-6`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {trigger ? (
              <>
                {/* Close icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-panel-right-close-icon lucide-panel-right-close"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M15 3v18" />
                  <path d="m10 15-3-3 3-3" />
                </svg>
              </>
            ) : (
              <>
                {/* Open icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-panel-right-close-icon lucide-panel-right-close"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M15 3v18" />
                  <path d="m8 9 3 3-3 3" />
                </svg>
              </>
            )}
          </svg>
        </button>
      </div>
    </div>
  );
}
