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
      <div className="mainHome">
        <h1 className="text-2xl md:text-4xl lg:text-4xl">Not Logged in</h1>
        <div className="loggedOutButtonContainer">
          <Button className="" onClick={openSignup} type="button">
            Sign Up
          </Button>
          <SignupForm open={signupModal} setOpen={setSignupModal} />
          <Button className="" onClick={openLogin} type="button">
            Login
          </Button>
          <LoginForm open={loginModal} setOpen={setLoginModal} />
          <TestAccountButton />
        </div>
      </div>
      <h1 className="welcomeMessage">
        Welcome to my Message app. Feel free to use the global test account to
        try out it's features without signing up. Thank's for stopping by.
      </h1>
    </div>
  );
}
