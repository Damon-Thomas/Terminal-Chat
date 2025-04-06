import "./App.css";
import "./components/genCSS/typewriter.css";
import UserContext from "./context/UserContext";
import NotFound from "./pages/404";
import ErrorPage from "./pages/ErrorPage";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromChildren,
} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import FriendContactPage from "./pages/contactPages/FriendContactPage";
import GroupContactPage from "./pages/contactPages/GroupContactPage";
import NonContactPage from "./pages/contactPages/NonContactPage";
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";
import NonUserHome from "./pages/subPages/NonUserHome";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route errorElement={<ErrorPage />}>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="/messages" element={<MessagesPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/friends" element={<FriendContactPage />} />
        <Route path="/groups" element={<GroupContactPage />} />
        <Route path="/meet" element={<NonContactPage />} />
      </Route>
      <Route path="/auth" element={<NonUserHome />} />
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
