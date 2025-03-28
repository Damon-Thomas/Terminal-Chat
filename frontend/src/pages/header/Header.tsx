import Button from "../../components/Buttons/Button";
import user from "../../fetchers/user";
import "./headerStyles.css";

export default function Header() {
  function handleHomeClick() {
    location.href = "/";
  }
  function logout() {
    user.logOut();
  }

  return (
    <div className="header ">
      <Button size="medium" onClick={handleHomeClick}>
        Home
      </Button>
      <Button size="medium" onClick={logout}>
        Log Out
      </Button>
    </div>
  );
}
