import React, { useEffect } from "react";
import "./sidebarStyles.css";
import SideItem from "./SideItem";
import getContacts from "../../fetchers/getContacts";
import SideTitle from "./SideTitle";
import contactActions from "../../context/ContactActions";
import Button from "../../components/Buttons/Button";

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

export default function MessageSideBar({
  setSelectedContact,
}: {
  setSelectedContact: React.Dispatch<React.SetStateAction<Contact | null>>;
}) {
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
    setSelectedContact(contactActions.getStoredContact());
  };

  const convoClickHandler = (convo: Convo) => {
    contactActions.storeContact({
      id: convo.id,
      username: convo.username,
      group: false,
    });
    setSelectedContact(contactActions.getStoredContact());
  };

  const incrementPage = (type: "group" | "convo", inc: boolean) => {
    if (type === "group") {
      if (inc) {
        if (groupSelection.length < 10) {
          return;
        }
        setGroupPage((p) => p + 1);
      } else {
        setGroupPage((p) => Math.max(1, p - 1));
      }
    } else {
      if (inc) {
        if (convoSelection.length < 10) {
          return;
        }
        setConvoPage((p) => p + 1);
      } else {
        setConvoPage((p) => Math.max(1, p - 1));
      }
    }
  };

  useEffect(() => {
    async function fetchGroups() {
      const fetchedGroups = await getContacts.getUserGroups(groupPage);
      if (fetchedGroups.success) {
        setGroups(fetchedGroups.groups);
      }
    }
    async function fetchConvos() {
      const convos = await getContacts.getActiveUserContacts(convoPage);
      if (convos.success) {
        setConvos(convos.contacts);
      }
    }
    fetchGroups();
    fetchConvos();
  }, []);

  useEffect(() => {
    async function updateGroupSelection() {
      console.log("userGroupPage", groupPage);
      const response = await getContacts.getUserGroups(groupPage);

      console.log("response", response);
      const groups = response.groups;
      if (groups.length === 0) {
        console.log("length is 0");
        setGroupPage((p) => Math.max(1, p - 1));
        return;
      }
      if (groups) {
        setGroupSelection(groups);
      } else {
        setGroupSelection([]);
        console.log("Error getting user groups");
      }
    }
    updateGroupSelection();
  }, [groupPage]);

  // useEffect(() => {
  //   function updateConvoSelection() {
  //     if (selection.length === 0 && convoPage > 1) {
  //       setConvoPage((prev) => prev - 1);
  //       updateConvoSelection();
  //     } else {
  //       setConvoSelection(selection);
  //     }
  //   }
  //   updateConvoSelection();
  // }, [convoPage, convos]);

  return (
    <div className={`sidebarOverlay ${!trigger ? "closed" : ""}`}>
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
              <Button
                size="small"
                onClick={() => incrementPage("group", false)}
              >
                Previous
              </Button>
              <span>Page {groupPage}</span>
              <Button size="small" onClick={() => incrementPage("group", true)}>
                Next
              </Button>
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
              <Button
                size="small"
                onClick={() => incrementPage("convo", false)}
              >
                Previous
              </Button>
              <span>Page {convoPage}</span>
              <Button size="small" onClick={() => incrementPage("convo", true)}>
                Next
              </Button>
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
