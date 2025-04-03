import Button from "../Buttons/Button";

export default function ContactSpace() {
  function friendButtonHandler() {
    location.href = "/friends";
  }
  function groupButtonHandler() {
    location.href = "/groups";
  }
  function meetSomeoneButtonHandler() {
    location.href = "/meet";
  }

  return (
    <div className="home-space contact-space">
      <h1 className="contactHeading">Your Contacts</h1>
      <div className="space-buttons">
        <Button type="button" className="" onClick={friendButtonHandler}>
          Friends
        </Button>
        <Button type="button" className="" onClick={groupButtonHandler}>
          Groups
        </Button>
        <Button type="button" className="" onClick={meetSomeoneButtonHandler}>
          Find New
        </Button>
      </div>
    </div>
  );
}
