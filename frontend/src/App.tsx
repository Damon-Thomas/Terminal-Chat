import { useState } from "react";
import SignUp from "./auth/signup";
import "./App.css";
import FormContainer from "./auth/formContainer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <FormContainer>
      <SignUp />
    </FormContainer>
    // <div className="main demo-container">
    //   <h1 className="glitch-message-title">Glitch Title</h1>

    //   <button onClick={() => setCount((count) => count + 1)}>
    //     Default Button ___________also count is {count}
    //   </button>

    //   <p className="system-message">This is a system message</p>
    //   <p className="message">This is a default message</p>
    //   {/* <div className="messageContainer"> */}
    //   <div className="chat-container">
    //     <p className="user-message">This is a normal user message</p>
    //     <p className="user-message">This is a second normal user message</p>
    //     <p className="user-glitch-message">This is a user glitch message</p>
    //     <p className="user-glitch-message">This is a 2nd user glitch message</p>
    //     <p className="received-message">This is a received message</p>
    //     <p className="user-message">This is a normal user message</p>
    //     <p className="glitch-received-message">
    //       This should be a subtle glitch
    //     </p>
    //     <p className="user-message">This is a normal user message</p>
    //   </div>
    //   {/* </div> */}
    //   <textarea name="" className="input-box" id=""></textarea>

    //   <input type="text" className="input-box" />
    // </div>
  );
}

export default App;
