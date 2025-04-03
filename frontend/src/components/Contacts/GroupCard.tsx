import sendActions from "../../fetchers/sendActions";
import Button from "../Buttons/Button";
import GoToButton from "./GoToButton";
import { type Group } from "./GroupContacts";

export default function GroupCard({
  group,
  nonUserGroups,
  setNonUserGroups,
  userGroups,
  setUserGroups,
}: {
  group: Group;
  nonUserGroups: Group[];
  setNonUserGroups: React.Dispatch<React.SetStateAction<Group[]>>;
  userGroups: Group[];
  setUserGroups: React.Dispatch<React.SetStateAction<Group[]>>;
}) {
  async function joinGroup(groupId: string) {
    const response = await sendActions.joinGroup(groupId);
    if (response) {
      console.log("Group joined");
      const group = nonUserGroups.find((group: Group) => group.id === groupId);
      if (group) {
        group.joined = true;
      }
      setNonUserGroups([...nonUserGroups]);
    } else {
      console.log("Error joining group");
    }
  }

  async function leaveGroup(groupId: string) {
    const response = await sendActions.leaveGroup(groupId);
    if (response) {
      console.log("Group left");
      const group = userGroups.find((group: Group) => group.id === groupId);
      if (group) {
        group.joined = false;
      }
      setUserGroups([...userGroups]);
    } else {
      console.log("Error leaving group");
    }
  }

  return group.joined ? (
    <div className="groupCard ">
      <h2 className="groupCardTitle ">{group.groupName}</h2>
      <div className="groupCardButtonWrapper">
        <GoToButton
          destination="/messages"
          group={true}
          id={group.id}
          username={group.groupName}
        >
          Message
        </GoToButton>
        <Button
          onClick={() => {
            leaveGroup(group.id);
          }}
        >
          Leave
        </Button>
      </div>
    </div>
  ) : (
    <div className="groupCard ">
      <h2 className="groupCardTitle ">{group.groupName}</h2>
      <div className="groupCardButtonWrapper">
        <Button
          size="small"
          onClick={() => {
            joinGroup(group.id);
          }}
        >
          Join Group
        </Button>
      </div>
    </div>
  );
}
