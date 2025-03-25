import Button from "../Buttons/Button";

export default function UserSpace() {
  function messageButtonHandler() {
    location.href = "/messages";
  }
  function profileButtonHandler() {
    console.log("Profile Button Clicked");
  }
  return (
    <div className="home-space user-space">
      <h1>Your Space</h1>
      <div>
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
