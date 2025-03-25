import { Outlet } from "react-router-dom";
import Header from "./header/Header";

export default function Layout() {
  return (
    <div className="layout h-screen w-screen flex flex-col ">
      <Header />
      <Outlet />
    </div>
  );
}
