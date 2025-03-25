import { useEffect, useState } from "react";
import getContacts from "../../fetchers/getContacts";
import Button from "../Buttons/Button";
import sendActions from "../../fetchers/sendActions";

export default function GroupContacts() {
  interface Group {
    id: string;
    groupName: string;
    joined: boolean;
  }

  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const [groupsOnPage, setGroupsOnPage] = useState<Group[]>([]);
  const [userGroupPage, setUserGroupPage] = useState(1);
  const [nonUserGroups, setNonUserGroups] = useState<Group[]>([]);
  const [nonGroupsOnPage, setNonGroupsOnPage] = useState<Group[]>([]);

  const [nonUserGroupPage, setNonUserGroupPage] = useState(1);

  useEffect(() => {
    async function getNonUserGroups() {
      const groups = await getContacts.getNonJoinedGroups();
      const updatedGroups = groups.map((group: Group) => ({
        ...group,
        joined: false,
      }));
      if (groups) {
        setNonUserGroups(updatedGroups);
      } else {
        setNonUserGroups([]);
        console.log("Error getting non user groups");
      }
    }
    async function getUserGroups() {
      const groups = await getContacts.getUserGroups();
      const updatedGroups = groups.map((group: Group) => ({
        ...group,
        joined: true,
      }));
      if (groups) {
        setUserGroups(updatedGroups);
      } else {
        setUserGroups([]);
        console.log("Error getting user groups");
      }
    }
    getUserGroups();
    getNonUserGroups();
  }, []);

  useEffect(() => {
    const groups = userGroups.slice(
      (userGroupPage - 1) * 10,
      userGroupPage * 10
    );
    const nonGroups = nonUserGroups.slice(
      (nonUserGroupPage - 1) * 10,
      nonUserGroupPage * 10
    );
    if (groups) {
      setGroupsOnPage(groups);
    } else {
      setGroupsOnPage([]);
      console.log("Error getting user groups");
    }
    if (nonGroups) {
      setNonGroupsOnPage(nonGroups);
    } else {
      setNonGroupsOnPage([]);
      console.log("Error getting non user groups");
    }
  }, [userGroupPage, userGroups, nonUserGroupPage, nonUserGroups]);

  async function joinGroup(groupId: string) {
    const response = await sendActions.joinGroup(groupId);
    if (response) {
      console.log("Group joined");
      const group = nonUserGroups.find((group) => group.id === groupId);
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
      const group = nonUserGroups.find((group) => group.id === groupId);
      if (group) {
        group.joined = true;
      }
      setNonUserGroups([...nonUserGroups]);
    } else {
      console.log("Error leaving group");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="userGroups">
        <h1 className="text-lg md:text-2xl lg:text-4xl">Groups</h1>
        <div className="flex flex-wrap gap-4">
          {groupsOnPage.map((group) =>
            group.joined ? (
              <div key={group.id} className="flex flex-col gap-2">
                <h2>{group.groupName}</h2>
                <Button onClick={() => {}}>Message Group</Button>
                <Button
                  onClick={() => {
                    leaveGroup(group.id);
                  }}
                >
                  Leave Group
                </Button>
              </div>
            ) : (
              <div key={group.id} className="flex flex-col gap-2">
                <h2>{group.groupName}</h2>
                <Button
                  onClick={() => {
                    joinGroup(group.id);
                  }}
                >
                  Join Group
                </Button>
              </div>
            )
          )}
        </div>
        <div className="flex justify-center mt-4 gap-2">
          <Button onClick={() => setUserGroupPage((p) => Math.max(1, p - 1))}>
            Previous
          </Button>
          <span>Page {userGroupPage}</span>
          <Button onClick={() => setUserGroupPage((p) => p + 1)}>Next</Button>
        </div>
      </div>
      <div className="userGroups">
        <h1 className="text-lg md:text-2xl lg:text-4xl">User Groups</h1>
        <div className="flex flex-wrap gap-4">
          {nonGroupsOnPage.map((group) =>
            group.joined ? (
              <div key={group.id} className="flex flex-col gap-2">
                <h2>{group.groupName}</h2>
                <Button onClick={() => {}}>Message Group</Button>
                <Button
                  onClick={() => {
                    leaveGroup(group.id);
                  }}
                >
                  Leave Group
                </Button>
              </div>
            ) : (
              <div key={group.id} className="flex flex-col gap-2">
                <h2>{group.groupName}</h2>
                <Button
                  onClick={() => {
                    joinGroup(group.id);
                  }}
                >
                  Join Group
                </Button>
              </div>
            )
          )}
        </div>
        <div className="flex justify-center mt-4 gap-2">
          <Button
            onClick={() => setNonUserGroupPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <span>Page {nonUserGroupPage}</span>
          <Button onClick={() => setNonUserGroupPage((p) => p + 1)}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
