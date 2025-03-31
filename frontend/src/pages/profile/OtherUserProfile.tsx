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
        <h6>Intro</h6>
        <p>{profile.intro}</p>
        <h6>Bio</h6>
        <p>{profile.bio}</p>
      </div>
    </div>
  );
}
