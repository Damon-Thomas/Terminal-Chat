import React, { useEffect } from "react";
import "./sidebarStyles.css";
import SideItem from "./SideItem";
import getContacts from "../../fetchers/getContacts";
import SideTitle from "./SideTitle";

type Contact =
  | { id: string; username: string; groupName?: never } // User object
  | { id: string; groupName: string; username?: never }; // Group object

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
type MessageSideBarProps = {
  setSelectedContact: React.Dispatch<React.SetStateAction<Contact>>;
};

export default function MessageSideBar({
  setSelectedContact,
}: MessageSideBarProps) {
  const [trigger, setTrigger] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [groups, setGroups] = React.useState([]);
  const [groupSelection, setGroupSelection] = React.useState<Group[]>([]);
  const [groupPage, setGroupPage] = React.useState(1);
  const [convos, setConvos] = React.useState([]);
  const [convoSelection, setConvoSelection] = React.useState<Convo[]>([]);
  const [convoPage, setConvoPage] = React.useState(1);

  const groupClickHandler = (group: Group) => {
    setSelectedContact({ id: group.id, groupName: group.groupName });
  };

  const convoClickHandler = (convo: Convo) => {
    setSelectedContact({ id: convo.id, username: convo.username });
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
        setConvos(convos.conversations);
      }
    }
    fetchGroups();
    fetchConvos();
  }, []);

  useEffect(() => {
    function updateGroupSelection() {
      const selection = groups.slice(groupPage * 5, groupPage * 5 + 5);
      if (selection.length === 0 && groupPage > 0) {
        setGroupPage((prev) => prev - 1);
        updateGroupSelection();
      } else {
        setGroupSelection(selection);
      }
    }
    function updateConvoSelection() {
      const selection = convos.slice(convoPage * 5, convoPage * 5 + 5);
      if (selection.length === 0 && convoPage > 0) {
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
      <div
        className={`sidebar ${
          trigger
            ? "openBar translate-x-0"
            : "closedBar -translate-x-[calc(100%)]"
        }`}
      >
        <aside className={`barContent`}>
          <div className="topSpace"></div>
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
        <div className="z-10 triggerIcon">
          <button
            onClick={() => {
              setTrigger(!trigger);
              setOpen(!open);
            }}
          >
            <svg
              className={`ease-in duration-500 w-8 h-8 sidebar-icon ${
                open ? "openIcon " : "closedIcon "
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 3v18" />
              <path d="m16 15-3-3 3-3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
//panel open
//<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left-open"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/></svg>

//panel close
//<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left-close"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m16 15-3-3 3-3"/></svg>
