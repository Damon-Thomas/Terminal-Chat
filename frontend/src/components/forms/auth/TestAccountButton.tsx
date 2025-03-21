import { useContext } from "react";
import user from "../../../fetchers/user";
import Button from "../../Buttons/Button";
import {
  CurrentUserContext,
  CurrentUserContextType,
} from "../../../context/CurrentUserContext";

export default function TestAccountButton() {
  const { setCurrentUser } = useContext(
    CurrentUserContext
  ) as CurrentUserContextType;

  async function testAccount() {
    const info = await user.logIn("TestAccount", "password");
    //info = {id: data.id, username: data.username, success: data.success}
    if (info.success) {
      setCurrentUser(info);
      // add redirect?
      // Here we can handle success logging into test account
    } else {
      console.log("Error logging into test account");
      const createInfo = await user.signUp("TestAccount", "password");
      if (createInfo && createInfo.success) {
        setCurrentUser(createInfo);
      } else {
        console.log("Error creating test account");
        //Here we can handle errors logging into test account
      }
    }
  }

  return (
    <Button type="button" className="test-button" onClick={testAccount}>
      Use Test Account
    </Button>
  );
}
