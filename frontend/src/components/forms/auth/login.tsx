import { useContext } from "react";
import {
  CurrentUserContext,
  CurrentUserContextType,
} from "../../../context/CurrentUserContext.ts";
import Button from "../../Buttons/Button.tsx";
import Input from "../../input/Input.tsx";
import InputWrapper from "../../input/InputWrapper.tsx";
import Label from "../../input/Label.tsx";
import Form from "../Form.tsx";
import "../forms.css";
import FormTitle from "../FormTitle.tsx";
import ModalContainer from "../ModalContainer.tsx";
import TestAccountButton from "./TestAccountButton.tsx";
import user from "../../../fetchers/user.ts";
import "./auth.css";
import { useState } from "react";
import ErrorMessage from "../../input/errorMessage.tsx";

export default function LogIn({
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
  });

  async function logIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    let errors = false;
    const clientErrors = {
      username: "",
      password: "",
    };
    const usernameLI = form.elements.namedItem(
      "usernameLI"
    ) as HTMLInputElement;
    if (usernameLI.value.length < 1 || usernameLI.value.length > 20) {
      clientErrors.username = "Username must be 1-20 characters";
      errors = true;
    }

    const passwordLI = form.elements.namedItem(
      "passwordLI"
    ) as HTMLInputElement;
    if (passwordLI.value.length < 1 || passwordLI.value.length > 20) {
      clientErrors.password = "Password must be 1-20 characters";
      errors = true;
    }
    if (errors) {
      setErrors(clientErrors);
      return;
    }
    const info = await user.logIn(usernameLI.value, passwordLI.value);
    if (info && info.success && info.id && info.username) {
      setCurrentUser({
        id: info.id,
        username: info.username,
        success: info.success,
      });
      location.href = "/";
    } else {
      if (info && info.success === false && info.errorMessage) {
        setErrors({
          username: "",
          password: info.errorMessage,
        });
      } else {
        setErrors({
          username: "",
          password: "Unkown Error While Logging in",
        });
      }
      console.log("Error logging in");
    }
  }

  function modalCloser() {
    setOpen(false);
    errorClearer();
  }

  function errorClearer() {
    setErrors({
      username: "",
      password: "",
    });
  }

  return (
    <ModalContainer isOpen={open} onClose={() => setOpen(true)}>
      <Button className="modalCloseButton" onClick={modalCloser} type="button">
        X
      </Button>
      <FormTitle title="Log In" />
      <Form onSubmit={logIn}>
        <InputWrapper>
          <Label htmlFor="usernameLI" text="Username" className="" />
          <Input
            className=""
            type="text"
            id="usernameLI"
            name="usernameLI"
            onChange={errorClearer}
          />
          <ErrorMessage>{errors.username}</ErrorMessage>
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="passwordLI" text="Password" className="" />
          <Input
            className=""
            type="password"
            id="passwordLI"
            name="passwordLI"
            onChange={errorClearer}
          />
          <ErrorMessage>{errors.password}</ErrorMessage>
        </InputWrapper>
        <Button type="submit" className="" onClick={() => {}}>
          Submit
        </Button>
        <TestAccountButton />
      </Form>
    </ModalContainer>
  );
}
