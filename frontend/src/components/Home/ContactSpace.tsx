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
    <div className="user-space">
      <h1>Your Contacts</h1>
      <div className="home-space contact-space">
        <Button type="button" className="" onClick={friendButtonHandler}>
          Friends
        </Button>
        <Button type="button" className="" onClick={groupButtonHandler}>
          Groups
        </Button>
        <Button type="button" className="" onClick={meetSomeoneButtonHandler}>
          Meet Someone New
        </Button>
      </div>
    </div>
  );
}
