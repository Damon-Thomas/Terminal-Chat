import Button from "../../Buttons/Button.tsx";
import Input from "../../input/Input.tsx";
import InputWrapper from "../../input/InputWrapper.tsx";
import Label from "../../input/Label.tsx";
import Form from "../Form.tsx";
import "../forms.css";
import FormTitle from "../FormTitle.tsx";
import ModalContainer from "../ModalContainer.tsx";

export default function SignUp() {
  return (
    <ModalContainer>
      <FormTitle title="Sign Up" />
      <Form>
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
      </Form>
    </ModalContainer>
  );
}
