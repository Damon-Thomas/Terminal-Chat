import React from "react";
import "./sidebarStyles.css";
import SideItem from "./SideItem";

export default function MessageSideBar() {
  const [trigger, setTrigger] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [groups, setGroups] = React.useState([]);
  const [friends, setFriends] = React.useState([]);

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
            <SideItem>content1 is still longer</SideItem>
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
