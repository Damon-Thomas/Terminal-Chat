import "./profile.css";
import greenAvatar from "../../assets/GreenFull.png";

export default function OtherUserProfile({
  profile,
  username,
}: {
  profile: { id: string; intro: string; bio: string };
  username: string;
}) {
  return (
    <div className="profile-page">
      <div>
        <h1>Profile Page of {username}:</h1>
        <div className="avatarContainer">
          <div className="avatarOverlay"></div>
          <img src={greenAvatar} alt="Avatar" className="avatar" />
        </div>
        <h6>Intro</h6>
        <p>{profile.intro}</p>
        <h6>Bio</h6>
        <p>{profile.bio}</p>
      </div>
    </div>
  );
}
