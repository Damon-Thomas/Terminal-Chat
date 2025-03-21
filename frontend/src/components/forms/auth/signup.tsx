import { useContext } from "react";
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

export default function SignUp() {
  const { setCurrentUser } = useContext(
    CurrentUserContext
  ) as CurrentUserContextType;

  async function signUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const usernameLI = form.elements.namedItem(
      "usernameSU"
    ) as HTMLInputElement;
    const passwordLI = form.elements.namedItem(
      "passwordSU"
    ) as HTMLInputElement;
    const confirmpasswordSU = form.elements.namedItem(
      "confirmpasswordSU"
    ) as HTMLInputElement;
    if (passwordLI.value !== confirmpasswordSU.value) {
      console.log("Passwords do not match");
      return;
    }
    const info = await user.logIn(usernameLI.value, passwordLI.value);
    if (info && info.success) {
      setCurrentUser(info);
    } else {
      console.log("Error logging in");
    }
  }
  return (
    <ModalContainer>
      <FormTitle title="Sign Up" />
      <Form onSubmit={signUp}>
        <InputWrapper>
          <Label htmlFor="usernameSU" text="Username" className="" />
          <Input
            className=""
            type="text"
            id="usernameSU"
            name="usernameSU"
            required
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="passwordSU" text="Password" className="" />
          <Input
            className=""
            type="password"
            id="passwordSU"
            name="passwordSU"
            required
          />
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
