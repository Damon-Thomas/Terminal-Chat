import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import { useEffect } from "react";
import user from "../fetchers/user";
import { CurrentUser } from "../context/CurrentUserContext";

export default function Layout() {
  return (
    <div className="layout h-screen w-screen flex flex-col ">
      <Header />
      <Outlet />
    </div>
  );
}
