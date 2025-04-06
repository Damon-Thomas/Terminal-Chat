import Button from "../../components/Buttons/Button";
import SignupForm from "../../components/forms/auth/signup";
import LoginForm from "../../components/forms/auth/login";
import TestAccountButton from "../../components/forms/auth/TestAccountButton";
import { useState } from "react";

export default function NonUserHome() {
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

  function openLogin() {
    setSignupModal(false);
    setLoginModal(true);
  }
  function openSignup() {
    setLoginModal(false);
    setSignupModal(true);
  }
  return (
    <div className="h-screen w-screen flex flex-col gap-4 md:gap-8 lg:gap-16 justify-center items-center">
      <SignupForm open={signupModal} setOpen={setSignupModal} />
      <LoginForm open={loginModal} setOpen={setLoginModal} />
      <div className="mainHome">
        <div className="mainBody">
          <h1 className="text-2xl md:text-4xl lg:text-4xl">Not Logged in</h1>
          <div className="loggedOutButtonContainer">
            <Button className="" onClick={openSignup} type="button">
              Sign Up
            </Button>
            <Button className="" onClick={openLogin} type="button">
              Login
            </Button>
            <TestAccountButton />
          </div>
        </div>
        <h1 className="welcomeMessage">
          Welcome to my Message app. Feel free to use the test account to try
          out its features without signing up. Thanks for stopping by.
        </h1>
      </div>
    </div>
  );
}
