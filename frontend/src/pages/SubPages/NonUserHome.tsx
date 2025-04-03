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
    <div className="h-screen w-screen flex flex-col gap-4 justify-center items-center">
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
  );
}
