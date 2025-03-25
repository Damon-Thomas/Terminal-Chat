import React from "react";
import "./sidebarStyles.css";

export default function MessageSideBar() {
  const [trigger, setTrigger] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [groups, setGroups] = React.useState([]);
  const [friends, setFriends] = React.useState([]);

  return (
    <>
      <aside className={`sidebarPreview`}>
        <div className="logoSpace">
          <div className="logo"></div>
        </div>
        <nav className="sideContentStyleLink">
          <div className="sidebarItem sideIcon">1</div>
          <div className="sidebarItem sideIcon">2</div>
          <div className="sidebarItem sideIcon">3</div>
          <div className="sidebarItem sideIcon">4</div>
          <div className="sidebarItem sideIcon">5</div>
          <div className="sidebarItem sideIcon">6</div>
        </nav>
      </aside>
      <aside
        className={`hiddenbar ease-in duration-500 ${
          open
            ? "open -translate-x-[calc(60px)]"
            : "closed -translate-x-[calc(100%+60px)]"
        } h-screen fixed left-15 bg-white shadow-sm w-content`}
      >
        <div className="logoSpace"></div>
        <div className="sideContentStyleLink">
          <p className="sidebarItem sidebarDescriptor">content1</p>
          <p className="sidebarItem sidebarDescriptor">content2</p>
          <p className="sidebarItem sidebarDescriptor">content3</p>
          <p className="sidebarItem sidebarDescriptor">content4</p>
          <p className="sidebarItem sidebarDescriptor">content5</p>
          <p className="sidebarItem sidebarDescriptor">content6</p>
        </div>
      </aside>
      <div className="z-10 triggerIcon fixed top-0 left-0 sm:left-15 p-2">
        <button
          onClick={() => {
            setTrigger(!trigger);
            setOpen(!open);
          }}
        >
          <svg
            className={`ease-in duration-500 translate-x-0 w-8 h-8 text-amber-300 sidebar-icon ${
              open ? "open translate-x-50" : "closed translate-x-0"
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
    </>
  );
}
//panel open
//<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left-open"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/></svg>

//panel close
//<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-left-close"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m16 15-3-3 3-3"/></svg>
