import "./App.css";
import "./components/genCSS/typewriter.css";
import UserContext from "./context/UserContext.tsx";
import NotFound from "./pages/404.tsx";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromChildren,
} from "react-router-dom";
import Home from "./pages/home.tsx";
import Layout from "./pages/Layout.tsx";
import FriendContactPage from "./pages/contactPages/FriendContactPage.tsx";
import GroupContactPage from "./pages/contactPages/GroupContactPage.tsx";
import NonContactPage from "./pages/contactPages/nonContactPage.tsx";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/friends" element={<FriendContactPage />} />
        <Route path="/groups" element={<GroupContactPage />} />
        <Route path="/meet" element={<NonContactPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return (
    <UserContext>
      <RouterProvider router={router} />
    </UserContext>
  );
}

export default App;
