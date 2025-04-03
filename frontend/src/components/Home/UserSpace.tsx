import ContactActions from "../../context/ContactActions";
import Button from "../Buttons/Button";

export default function UserSpace() {
  function messageButtonHandler() {
    ContactActions.clearStoredContact();
    location.href = "/messages";
  }
  function profileButtonHandler() {
    ContactActions.clearStoredContact();
    location.href = "/profile";
  }
  return (
    <div className="home-space user-space">
      <h1 className="contactHeading">Your Space</h1>
      <div className="space-buttons">
        <Button type="button" className="" onClick={messageButtonHandler}>
          Messages
        </Button>
        <Button type="button" className="" onClick={profileButtonHandler}>
          Profile
        </Button>
      </div>
    </div>
  );
}
