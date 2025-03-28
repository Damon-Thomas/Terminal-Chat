import { useState } from "react";
import useAuth from "../../context/useAuth";
import ErrorMessage from "../input/errorMessage";
import Input from "../input/Input";
import Label from "../input/Label";
import InputWrapper from "../input/InputWrapper";
import Form from "./Form";
import Button from "../Buttons/Button";
import sendActions from "../../fetchers/sendActions";
import contactActions from "../../context/ContactActions";

export default function CreateGroup() {
  const [error, setError] = useState("");
  const { user } = useAuth();

  const groupHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const groupName = (formData.get("groupName") as string).trim();
    console.log("groupName", groupName);
    if (!groupName) {
      setError("Group name is required");
      return;
    }
    if (groupName.length < 3) {
      setError("Group name must be at least 3 characters");
      return;
    }
    if (groupName.length > 20) {
      setError("Group name must be less than 20 characters");
      return;
    }
    const response = await sendActions.createGroup(groupName);
    if (!response || response.failure) {
      setError(response ? response.message : "Error creating group");
      return;
    } else {
      setError("");
    }
    const group = response.group;
    console.log("response", response);
    if (response.error) {
      setError(response.error);
      return;
    }
    if (response && !response.failure) {
      setError("");
      //join the group? do in backend
      contactActions.storeContact({
        id: group.id,
        group: true,
        username: group.groupName,
      });
      location.href = `/messages`;
    }
  };
  return (
    <div className="createGroup">
      <h1>Create Group</h1>
      <Form onSubmit={groupHandler}>
        <InputWrapper>
          <Label htmlFor="groupName" text={"Group Name:"}></Label>
          <Input type="text" id="groupName" name="groupName" />
          <ErrorMessage>{error}</ErrorMessage>
        </InputWrapper>
        <Button type="submit">Create Group</Button>
      </Form>
    </div>
  );
}
