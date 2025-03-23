import Button from "../Buttons/Button";

export default function ContactSpace() {
  function friendButtonHandler() {
    console.log("Friend Button Clicked");
  }
  function groupButtonHandler() {
    console.log("Group Button Clicked");
  }
  function meetSomeoneButtonHandler() {
    console.log("Meet Someone Button Clicked");
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
