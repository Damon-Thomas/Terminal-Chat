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

export default function LogIn() {
  const { setCurrentUser } = useContext(
    CurrentUserContext
  ) as CurrentUserContextType;

  async function logIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const usernameLI = form.elements.namedItem(
      "usernameLI"
    ) as HTMLInputElement;
    const passwordLI = form.elements.namedItem(
      "passwordLI"
    ) as HTMLInputElement;
    const info = await user.logIn(usernameLI.value, passwordLI.value);
    if (info && info.success) {
      setCurrentUser(info);
    } else {
      console.log("Error logging in");
    }
  }

  return (
    <ModalContainer>
      <FormTitle title="Log In" />
      <Form onSubmit={logIn}>
        <InputWrapper>
          <Label htmlFor="usernameLI" text="Username" className="" />
          <Input
            className=""
            type="text"
            id="usernameLI"
            name="usernameLI"
            required
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="passwordLI" text="Password" className="" />
          <Input
            className=""
            type="password"
            id="passwordLI"
            name="passwordLI"
            required
          />
        </InputWrapper>
        <Button type="submit" className="" onClick={() => {}}>
          Submit
        </Button>
        <TestAccountButton />
      </Form>
    </ModalContainer>
  );
}
