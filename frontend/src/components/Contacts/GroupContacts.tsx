import { useEffect, useState } from "react";
import getContacts from "../../fetchers/getContacts";
import Button from "../Buttons/Button";
import sendActions from "../../fetchers/sendActions";
import GoToButton from "./GoToButton";
import CreateGroup from "../forms/CreateGroup";

export default function GroupContacts() {
  interface Group {
    id: string;
    groupName: string;
    joined: boolean;
  }

  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const [userGroupPage, setUserGroupPage] = useState(1);
  const [nonUserGroups, setNonUserGroups] = useState<Group[]>([]);
  const [nonGroupErrors, setNonGroupErrors] = useState("");
  const [userGroupErrors, setUserGroupErrors] = useState("");
  const [nonUserGroupPage, setNonUserGroupPage] = useState(1);

  useEffect(() => {
    async function getNonUserGroups() {
      const response = await getContacts.getNonJoinedGroups(nonUserGroupPage);
      if (!response || response.failure) {
        console.log("Error getting user groups");
        setNonGroupErrors("Error getting user groups");
        return;
      } else {
        setNonGroupErrors("");
      }
      const groups = response.groups;
      if (groups.length === 0) {
        setNonUserGroupPage((p) => Math.max(1, p - 1));
        return;
      }
      console.log("nonUserGroups", groups);
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
    getNonUserGroups();
  }, [nonUserGroupPage]);

  useEffect(() => {
    async function getUserGroups() {
      const response = await getContacts.getUserGroups(userGroupPage);
      if (!response || response.failure) {
        console.log("Error getting user groups");
        setUserGroupErrors("Error getting user groups");
        return;
      } else {
        setUserGroupErrors("");
      }
      const groups = response.groups;
      if (groups.length === 0) {
        setUserGroupPage((p) => Math.max(1, p - 1));
        return;
      }
      console.log("userGroups", groups);
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
  }, [userGroupPage]);

  // useEffect(() => {
  //   const groups = userGroups.slice(
  //     (userGroupPage - 1) * 10,
  //     userGroupPage * 10
  //   );
  //   const nonGroups = nonUserGroups.slice(
  //     (nonUserGroupPage - 1) * 10,
  //     nonUserGroupPage * 10
  //   );
  //   if (groups) {
  //     setGroupsOnPage(groups);
  //   } else {
  //     setGroupsOnPage([]);
  //     console.log("Error getting user groups");
  //   }
  //   if (nonGroups) {
  //     setNonGroupsOnPage(nonGroups);
  //   } else {
  //     setNonGroupsOnPage([]);
  //     console.log("Error getting non user groups");
  //   }
  // }, [userGroupPage, userGroups, nonUserGroupPage, nonUserGroups]);

  function incUserGroupPage(bool: boolean, joined: boolean) {
    if (!bool) {
      if (joined) {
        setUserGroupPage((p) => Math.max(1, p - 1));
      } else {
        setNonUserGroupPage((p) => Math.max(1, p - 1));
      }
      return;
    }
    if (joined) {
      if (userGroups.length < 10) {
        return;
      } else {
        setUserGroupPage((p) => p + 1);
        return;
      }
    }
  }

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
      <CreateGroup />
      <div className="userGroups">
        <h1 className="text-lg md:text-2xl lg:text-4xl">Groups</h1>
        <div className="flex flex-wrap gap-4">
          {userGroups.map((group) =>
            group.joined ? (
              <div key={group.id} className="flex flex-col gap-2">
                <h2>{group.groupName}</h2>
                <GoToButton
                  destination="/messages"
                  group={true}
                  id={group.id}
                  username={group.groupName}
                >
                  Message Group
                </GoToButton>
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
          <Button onClick={() => incUserGroupPage(false, true)}>
            Previous
          </Button>
          <span>Page {userGroupPage}</span>
          <Button onClick={() => incUserGroupPage(true, true)}>Next</Button>
        </div>
      </div>
      <div className="userGroups">
        <h1 className="text-lg md:text-2xl lg:text-4xl">User Groups</h1>
        <div className="flex flex-wrap gap-4">
          {nonUserGroups.map((group) =>
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
          <Button onClick={() => incUserGroupPage(false, false)}>
            Previous
          </Button>
          <span>Page {nonUserGroupPage}</span>
          <Button onClick={() => incUserGroupPage(true, false)}>Next</Button>
        </div>
      </div>
    </div>
  );
}
