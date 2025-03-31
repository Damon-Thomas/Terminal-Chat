import { useEffect, useState } from "react";
import ContactActions from "../context/ContactActions";
import profile from "../fetchers/profile";
import useAuth from "../context/useAuth";

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
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          console.log("Profile data:", data);
          setProfileInfo(data);
        } catch (error) {
          console.error("Error fetching profile info:", error);
        }
      } else {
        try {
          const storedContact = ContactActions.getStoredContact();
          setUsername(storedContact.username);
          setOwnProfile(false);
          const response = await profile.getProfile(storedContact.id);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          console.log("Profile data:", data);
          setProfileInfo(data);
        } catch (error) {
          console.error("Error fetching profile info:", error);
        }
      }
    };
    fetchProfileInfo();
  }, [user]);

  return (
    <div>
      {ownProfile ? (
        <p>form</p>
      ) : (
        <div className="profile-page">
          <div>
            <h1>Profile Page: {username}</h1>
            <h6>Intro</h6>
            <p>{profileInfo.intro}</p>
            <h6>Bio</h6>
            <p>{profileInfo.bio}</p>
          </div>
        </div>
      )}
    </div>
  );
}
