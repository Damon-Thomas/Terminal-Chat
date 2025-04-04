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
  const [open, setOpen] = React.useState(true);
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

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setTrigger(false);
    } else {
      setTrigger(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
  }, [convoPage, groupPage]);

  useEffect(() => {
    async function updateGroupSelection() {
      console.log("userGroupPage", groupPage);
      const response = await getContacts.getUserGroups(groupPage);

      console.log("response", response);
      const groups = response.groups;
      if (groups.length === 0 && groupPage > 1) {
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

  useEffect(() => {
    async function updateConvoSelection() {
      const response = await getContacts.getActiveUserContacts(convoPage);
      console.log("response", response);
      const convos = response.users;

      if (convos.length === 0 && convoPage > 1) {
        console.log("length is 0");
        setConvoPage((p) => Math.max(1, p - 1));
        return;
      }
      if (convos) {
        setConvoSelection(convos);
      } else {
        setConvoSelection([]);
        console.log("Error getting user groups");
      }
    }
    updateConvoSelection();
  }, [convoPage, convos]);

  return (
    <div className={`sidebarOverlay ${!trigger ? "closed" : "open"}`}>
      <div className={`sidebar ${trigger ? "openBar" : "closedBar"}`}>
        <aside className="barContent">
          <div className="sidebarSection">
            <SideTitle>Groups</SideTitle>
            <div className="itemContainer">
              {groupSelection.map((group, index) => (
                <SideItem
                  clickHandler={() => groupClickHandler(group)}
                  key={index}
                >
                  {group.groupName}
                </SideItem>
              ))}
            </div>
            <div className="pageNav">
              <Button
                size="small"
                onClick={() => incrementPage("group", false)}
              >
                Prev
              </Button>
              <span>Page {groupPage}</span>
              <Button size="small" onClick={() => incrementPage("group", true)}>
                Next
              </Button>
            </div>
          </div>
          <div className="sidebarSection">
            <div className="itemContainer">
              <SideTitle>Conversations</SideTitle>
              {convoSelection.map((convo, index) => (
                <SideItem
                  clickHandler={() => convoClickHandler(convo)}
                  key={index}
                >
                  {convo.username}
                </SideItem>
              ))}
            </div>
            <div className="pageNav">
              <Button
                size="small"
                onClick={() => incrementPage("convo", false)}
              >
                Prev
              </Button>
              <span>Page {convoPage}</span>
              <Button size="small" onClick={() => incrementPage("convo", true)}>
                Next
              </Button>
            </div>
          </div>
        </aside>
      </div>

      <div className={`triggerIcon ${!trigger ? "closed" : "open"}`}>
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
