import Input from "../../input/Input.tsx";
import InputWrapper from "../../input/InputWrapper.tsx";
import Label from "../../input/Label.tsx";
import Form from "../components/forms/Form.tsx";
import "../components/forms/forms.css";
import FormTitle from "../components/forms/FormTitle.tsx";
import ModalOverlayContainer from "../components/forms/ModalOverlayContainer.tsx";

export default function SignUp() {
  return (
    <ModalOverlayContainer>
        <FormTitle title="Sign Up" />
        <Form>
          <InputWrapper>
            <Label htmlFor="usernameSU" text="Username" className="" />
            <Input className="" type="text" id="usernameSU" name="usernameSU" />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="passwordSU" text="Password" className="" />
            <Input
              className=""
              type="password"
              id="passwordSU"
              name="passwordSU"
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
            />
          </InputWrapper>

          <button type="submit">Submit</button>
          </Form>
      </div>
    </ModalOverlayContainer>
  );
}
