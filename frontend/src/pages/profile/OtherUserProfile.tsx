import "./profile.css";
import greenAvatar from "../../assets/BlueFull.png";
import GoToButton from "../../components/Contacts/GoToButton";
import { useEffect, useState } from "react";
import ContactActions from "../../context/ContactActions";
import useAuth from "../../context/useAuth";
import getContacts from "../../fetchers/getContacts";
import Button from "../../components/Buttons/Button";
import sendActions from "../../fetchers/sendActions";

export default function OtherUserProfile({
  profile,
  username,
}: {
  profile: { id: string; intro: string; bio: string };
  username: string;
}) {
  const [pageUser, setPageUser] = useState({
    id: "",
    username: "",
    group: false,
  });
  const [friends, setFriends] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const selectedUser = ContactActions.getStoredContact();
    if (selectedUser) {
      setPageUser({
        id: selectedUser.id,
        username: selectedUser.username,
        group: selectedUser.group,
      });
    }
  }, []);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await getContacts.isFriend(user.id, pageUser.id);
        console.log("Is friend:", response);
        setFriends(response);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    fetchFriends();
  }, [user, pageUser]);

  async function handleAddFriend() {
    try {
      const response = await sendActions.addFriend(pageUser.id);
      console.log("Response from addFriend:", response);
      if (!response.failure) {
        console.log("Friend added successfully");
        setFriends(true);
      } else {
        console.error("Error adding friend:", response.message);
      }
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  }
  async function handleRemoveFriend() {
    try {
      const response = await sendActions.removeFriend(pageUser.id);
      console.log("Response from removeFriend:", response);
      if (!response.failure) {
        console.log("Friend removed successfully");
        setFriends(false);
      } else {
        console.error("Error removing friend:", response.message);
      }
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  }

  return (
    <div className="profile-page">
      <div>
        <div className="avatarNameWrapper">
          <div className="avatarContainer">
            <div className="avatarOverlay"></div>
            <img src={greenAvatar} alt="Avatar" className="avatar" />
          </div>
          <h1>{username}:</h1>
        </div>
        <div className="buttonWrapper">
          <GoToButton
            destination="/messages"
            id={pageUser.id}
            username={pageUser.username}
            group={pageUser.group}
          >
            Message
          </GoToButton>
          {friends ? (
            <Button className="addContactButton" onClick={handleRemoveFriend}>
              Remove Friend
            </Button>
          ) : (
            <Button className="addContactButton" onClick={handleAddFriend}>
              Add Friend
            </Button>
          )}
        </div>
        <h6>Intro</h6>
        <p>{profile.intro}</p>
        <h6>Bio</h6>
        <p>{profile.bio}</p>
      </div>
    </div>
  );
}
