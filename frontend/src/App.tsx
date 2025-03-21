import SignUp from "./components/forms/auth/signup.tsx";
import "./App.css";
import "./components/genCSS/typewriter.css";
import UserContext from "./context/userContext.tsx";
import LogIn from "./components/forms/auth/login.tsx";

function App() {
  return (
    <UserContext>
      {/* <SignUp /> */}
      <LogIn />
    </UserContext>
  );
}

export default App;
