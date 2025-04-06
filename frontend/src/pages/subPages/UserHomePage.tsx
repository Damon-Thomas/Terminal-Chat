import ContactSpace from "../../components/Home/ContactSpace";
import UserSpace from "../../components/Home/UserSpace";

export default function UserHomePage({ username }: { username: string }) {
  return (
    <div className="home-page flex flex-wrap gap-4 ">
      <h1 className="homeTitle">Logged in as: {username}</h1>
      <div className="homeContent">
        <UserSpace />
        <ContactSpace />
      </div>
    </div>
  );
}
