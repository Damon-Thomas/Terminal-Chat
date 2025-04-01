import { useEffect, useState } from "react";
import Button from "../../components/Buttons/Button";
import Form from "../../components/forms/Form";
import FormTitle from "../../components/forms/FormTitle";
import InputWrapper from "../../components/input/InputWrapper";
import Label from "../../components/input/Label";
import LongInput from "../../components/input/LongInput";
import blueAvatar from "../../assets/BlueFull.png";
export default function ProfileForm({
  profile,
  setProfile,
  username,
}: {
  profile: {
    id: string;
    bio: string;
    intro: string;
  };
  setProfile: React.Dispatch<
    React.SetStateAction<{
      id: string;
      bio: string;
      intro: string;
    }>
  >;
  username: string;
}) {
  const [name, setName] = useState("");
  interface HandleFormChangeEvent {
    target: { value: string };
  }

  useEffect(() => {
    setName(username);
  }, [username]);

  type HandleFormChangeType = "bio" | "intro";

  function handleFormChange(
    e: HandleFormChangeEvent,
    type: HandleFormChangeType
  ): void {
    if (type === "bio") {
      setProfile({ ...profile, bio: e.target.value });
    } else if (type === "intro") {
      setProfile({ ...profile, intro: e.target.value });
    }
  }

  return (
    <Form
      onSubmit={(e) => {
        console.log(e);
        e.preventDefault();
      }}
    >
      <FormTitle title={`Edit Profile of ${name}`}></FormTitle>
      <div className="userAvatarContainer">
        <div className="userAvatarOverlay"></div>
        <img src={blueAvatar} alt="Avatar" className="avatar" />
      </div>
      <InputWrapper>
        <Label htmlFor="intro" text="Intro" />
        <LongInput
          value={profile.intro}
          setValue={(value) => handleFormChange({ target: { value } }, "intro")}
          name="intro"
          id="intro"
        ></LongInput>
        <Label htmlFor="bio" text="Bio" />
        <LongInput
          value={profile.bio}
          setValue={(value) => handleFormChange({ target: { value } }, "bio")}
          name="bio"
          id="bio"
        ></LongInput>
        <Button type="submit">Save</Button>
      </InputWrapper>
    </Form>
  );
}
