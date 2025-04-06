import { useState } from "react";
import Button from "../../components/Buttons/Button";
import Form from "../../components/forms/Form";
import FormTitle from "../../components/forms/FormTitle";
import InputWrapper from "../../components/input/InputWrapper";
import Label from "../../components/input/Label";
import LongInput from "../../components/input/LongInput";
import blueAvatar from "../../assets/BlueFull.png";
import ErrorMessage from "../../components/input/ErrorMessage";
import profileAPI from "../../fetchers/profile";
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
  const [errors, setErrors] = useState({
    bio: "",
    intro: "",
  });
  const [notices, setNotices] = useState("");

  interface HandleFormChangeEvent {
    target: { value: string };
  }

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

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submitting form", profile);
    const bio = (e.target as HTMLFormElement).bio.value;
    const intro = (e.target as HTMLFormElement).intro.value;
    console.log("bio", bio, intro);
    setNotices("");
    const newErrors = {
      bio: "",
      intro: "",
    };
    if (bio.length > 250) {
      newErrors.bio = `(${bio.length}) Bio must be less than 250 characters`;
    }
    if (intro.length > 100) {
      newErrors.intro = `(${intro.length}) Intro must be less than 100 characters`;
    }
    if (bio.length === 0) {
      newErrors.bio = "Bio cannot be empty";
    }
    if (intro.length === 0) {
      newErrors.intro = "Intro cannot be empty";
    }
    setErrors(newErrors);
    if (newErrors.bio || newErrors.intro) {
      return;
    }
    try {
      const response = await profileAPI.editProfile({
        bio: bio,
        intro: intro,
      });
      console.log("response", response);
      if (response.failure) {
        setErrors({
          bio: "",
          intro: response.message || "Error updating profile",
        });
      } else if (!response.failure) {
        setNotices("Profile updated successfully");
        setErrors({
          bio: "",
          intro: "",
        });
        setProfile({
          ...profile,
          bio: bio,
          intro: intro,
        });
        setNotices("Profile updated successfully");
      }
    } catch (e) {
      console.log("Error updating profile", e);
    }
  }

  function resetNotices() {
    setNotices("");
    setErrors({
      bio: "",
      intro: "",
    });
  }

  return (
    <Form
      onSubmit={(e) => {
        submitForm(e);
        e.stopPropagation();
      }}
      className="profileForm"
    >
      <div className="formContent">
        <div className="blockOne">
          <FormTitle className="profileTitle" title={username}></FormTitle>
          <div className="avatarUsernameWrapper">
            <div className="userAvatarContainer">
              <div className="userAvatarOverlay"></div>
              <img src={blueAvatar} alt="Avatar" className="avatar" />
            </div>
          </div>
        </div>
        <div className="blockTwo">
          <InputWrapper className="profileInputWrapper one">
            <Label
              className="otherProfileHeading glitch-received-message"
              htmlFor="intro"
              text="Intro"
            />
            <LongInput
              className="profileInput intro"
              value={profile.intro}
              setValue={(value) =>
                handleFormChange({ target: { value } }, "intro")
              }
              name="intro"
              id="intro"
              otherSetValue={resetNotices}
            ></LongInput>

            <ErrorMessage className="profileError">{errors.intro}</ErrorMessage>
          </InputWrapper>
          <InputWrapper className="profileInputWrapper two">
            <Label
              className=" otherProfileHeading glitch-received-message"
              htmlFor="bio"
              text="Bio"
            />
            <LongInput
              className="profileInput bio"
              value={profile.bio}
              setValue={(value) =>
                handleFormChange({ target: { value } }, "bio")
              }
              name="bio"
              id="bio"
              otherSetValue={resetNotices}
            ></LongInput>
            <ErrorMessage className="profileError">
              {notices === "" ? errors.bio : notices}
            </ErrorMessage>
          </InputWrapper>
          <Button className="profileButton" size="large" type="submit">
            Save
          </Button>
        </div>
      </div>
    </Form>
  );
}
