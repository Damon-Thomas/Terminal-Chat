import { useContext, useState } from "react";
import Button from "../../Buttons/Button.tsx";
import Input from "../../input/Input.tsx";
import InputWrapper from "../../input/InputWrapper.tsx";
import Label from "../../input/Label.tsx";
import Form from "../Form.tsx";
import "../forms.css";
import FormTitle from "../FormTitle.tsx";
import ModalContainer from "../ModalContainer.tsx";
import TestAccountButton from "./TestAccountButton.tsx";
import {
  CurrentUserContext,
  CurrentUserContextType,
} from "../../../context/CurrentUserContext.ts";
import user from "../../../fetchers/user.ts";
import ErrorMessage from "../../input/errorMessage.tsx";
import "./auth.css";

export default function SignUp({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const { setCurrentUser } = useContext(
    CurrentUserContext
  ) as CurrentUserContextType;

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  async function signUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Signing up");
    const form = event.target as HTMLFormElement;
    let errors = false;
    const clientErrors = {
      username: "",
      password: "",
      confirmPassword: "",
    };
    const usernameLI = form.elements.namedItem(
      "usernameSU"
    ) as HTMLInputElement;
    if (usernameLI.value.length < 1 || usernameLI.value.length > 20) {
      clientErrors.username = "Username must be 1-20 characters";
      errors = true;
    }
    const passwordLI = form.elements.namedItem(
      "passwordSU"
    ) as HTMLInputElement;
    if (passwordLI.value.length < 1 || passwordLI.value.length > 20) {
      clientErrors.password = "Password must be 1-20 characters";
      errors = true;
    }
    const confirmpasswordSU = form.elements.namedItem(
      "confirmpasswordSU"
    ) as HTMLInputElement;
    if (passwordLI.value !== confirmpasswordSU.value) {
      clientErrors.confirmPassword = "Passwords must match";
      errors = true;
    }
    if (errors) {
      setErrors(clientErrors);
      return;
    }
    console.log("No client errors");
    const info = await user.signUp(
      usernameLI.value,
      passwordLI.value,
      confirmpasswordSU.value
    );
    if (info && info.success) {
      setCurrentUser(info);
    } else {
      if (info && info.success === false && info.errors) {
        setErrors(info.errors);
      }
      console.log("Error logging in");
    }
  }
  return (
    <ModalContainer
      isOpen={open}
      onClose={() => {
        setOpen(true);
      }}
    >
      <Button
        className="modalCloseButton"
        onClick={() => setOpen(false)}
        type="button"
      >
        X
      </Button>
      <FormTitle title="Sign Up" />
      <Form onSubmit={signUp}>
        <InputWrapper>
          <Label htmlFor="usernameSU" text="Username" className="" />
          <Input className="" type="text" id="usernameSU" name="usernameSU" />
          <ErrorMessage>{errors.username}</ErrorMessage>
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="passwordSU" text="Password" className="" />
          <Input
            className=""
            type="password"
            id="passwordSU"
            name="passwordSU"
          />
          <ErrorMessage>{errors.password}</ErrorMessage>
        </InputWrapper>
        <InputWrapper>
          <Label
            htmlFor="confirmpasswordSU"
            text="Confirm Password"
            className=""
          />
          <Input
            className=""
            type="password"
            id="confirmpasswordSU"
            name="confirmpasswordSU"
          />
          <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
        </InputWrapper>

        <Button type="submit" className="" onClick={() => {}}>
          Submit
        </Button>
        <TestAccountButton />
      </Form>
    </ModalContainer>
  );
}
