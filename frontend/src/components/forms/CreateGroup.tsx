import { useState } from "react";
import ErrorMessage from "../input/ErrorMessage";
import Input from "../input/Input";
import InputWrapper from "../input/InputWrapper";
import Form from "./Form";
import Button from "../Buttons/Button";
import sendActions from "../../fetchers/sendActions";
import contactActions from "../../context/contactActions";

export default function CreateGroup() {
  const [error, setError] = useState("");
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
      contactActions.storeContact({
        id: group.id,
        group: true,
        username: group.groupName,
      });
      location.href = `/messages`;
    }
  };

  function clearErrors() {
    setError("");
  }

  return (
    <div className="createGroup ">
      <h1 className="createGroupTitle glitch-received-message">Create Group</h1>
      <Form className="createGroupForm" onSubmit={groupHandler}>
        <InputWrapper>
          <Input
            placeholder="Enter Group Name..."
            type="text"
            id="groupName"
            name="groupName"
            onChange={clearErrors}
          />
          <ErrorMessage className="groupError">{error}</ErrorMessage>
        </InputWrapper>
        <Button type="submit">Create Group</Button>
      </Form>
    </div>
  );
}
