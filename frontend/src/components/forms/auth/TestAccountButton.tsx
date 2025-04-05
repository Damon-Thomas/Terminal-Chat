import { useContext } from "react";
import user from "../../../fetchers/user";
import Button from "../../Buttons/Button";
import {
  CurrentUserContext,
  CurrentUserContextType,
} from "../../../context/CurrentUserContext";

export default function TestAccountButton({
  size = "small",
}: {
  size?: "small" | "medium" | "large";
}) {
  const { setCurrentUser } = useContext(
    CurrentUserContext
  ) as CurrentUserContextType;

  async function testAccount() {
    const info = await user.logIn("TestAccount", "password");
    //info = {id: data.id, username: data.username, success: data.success}
    if (info.success) {
      setCurrentUser({
        id: info.id,
        username: info.username,
        success: info.success,
      });
      location.href = "/";
      // add redirect?
      // Here we can handle success logging into test account
    } else {
      console.log("Error logging into test account");
      const createInfo = await user.signUp(
        "TestAccount",
        "password",
        "password"
      );
      if (createInfo && createInfo.success) {
        setCurrentUser({
          id: createInfo.id,
          username: createInfo.username,
          success: createInfo.success,
        });
      } else {
        console.log("Error creating test account");
        //Here we can handle errors logging into test account
      }
    }
  }

  return (
    <Button
      type="button"
      size={size}
      className="test-button authButton"
      onClick={testAccount}
    >
      Use Test Account
    </Button>
  );
}
