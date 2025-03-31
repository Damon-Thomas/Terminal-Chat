import { useEffect, useState } from "react";
import ContactActions from "../context/ContactActions";
import profile from "../fetchers/profile";
import useAuth from "../context/useAuth";
import ProfileForm from "./profile/ProfileForm";
import OtherUserProfile from "./profile/OtherUserProfile";

interface ProfileInfo {
  id: string;
  bio: string;
  intro: string;
}

export default function ProfilePage() {
  const [profileInfo, setProfileInfo] = useState({
    id: "",
    bio: "",
    intro: "",
  } as ProfileInfo);
  const [username, setUsername] = useState("");
  const [ownProfile, setOwnProfile] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfileInfo = async () => {
      if (ContactActions.getStoredContact() === null) {
        try {
          setUsername(user.username);
          setOwnProfile(true);
          const response = await profile.getProfile(user.id);
          setProfileInfo(response);
        } catch (error) {
          console.error("Error fetching profile info user:", error);
        }
      } else {
        try {
          const storedContact = ContactActions.getStoredContact();
          setUsername(storedContact.username);
          setOwnProfile(false);
          const response = await profile.getProfile(storedContact.id);
          setProfileInfo(response);
        } catch (error) {
          console.error("Error fetching profile info other:", error);
        }
      }
    };
    fetchProfileInfo();
  }, [user]);

  return (
    <div>
      {ownProfile ? (
        <ProfileForm
          profile={profileInfo}
          setProfile={setProfileInfo}
          username={username}
        ></ProfileForm>
      ) : (
        <OtherUserProfile
          profile={profileInfo}
          username={username}
        ></OtherUserProfile>
      )}
    </div>
  );
}
