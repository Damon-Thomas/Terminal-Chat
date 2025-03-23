import ContactSpace from "../components/Home/ContactSpace";
import UserSpace from "../components/Home/UserSpace";

export default function UserHomePage() {
  return (
    <div className="home-page flex flex-wrap gap-4 ">
      <UserSpace />
      <ContactSpace />
    </div>
  );
}
