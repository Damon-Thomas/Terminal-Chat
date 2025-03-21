import SignUp from "./components/forms/auth/signup.tsx";
import "./App.css";
import "./components/genCSS/typewriter.css";
import UserContext from "./context/userContext.tsx";

function App() {
  return (
    <UserContext>
      <SignUp />
    </UserContext>
  );
}

export default App;
