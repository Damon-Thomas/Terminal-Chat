import { useEffect, useState } from "react";
import getContacts from "../../fetchers/getContacts";
import Button from "../Buttons/Button";
import CreateGroup from "../forms/CreateGroup";
import GroupCard from "./GroupCard";

export interface Group {
  id: string;
  groupName: string;
  joined: boolean;
}

export default function GroupContacts() {
  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const [userGroupPage, setUserGroupPage] = useState(1);
  const [nonUserGroups, setNonUserGroups] = useState<Group[]>([]);
  const [nonUserGroupPage, setNonUserGroupPage] = useState(1);

  useEffect(() => {
    async function getNonUserGroups() {
      console.log("nonUserGroupPage", nonUserGroupPage);
      const response = await getContacts.getNonJoinedGroups(nonUserGroupPage);
      if (!response || response.failure) {
        console.log("Error getting user groups");
        return;
      }
      const groups = response.groups;
      if (groups.length === 0) {
        setNonUserGroupPage((p) => Math.max(1, p - 1));
        return;
      }

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
      console.log("userGroupPage", userGroupPage);
      const response = await getContacts.getUserGroups(userGroupPage);
      if (!response || response.failure) {
        console.log("Error getting user groups");
        return;
      }
      console.log("response", response);
      const groups = response.groups;
      if (groups.length === 0) {
        console.log("length is 0");
        setUserGroupPage((p) => Math.max(1, p - 1));
        return;
      }
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

  function incUserGroupPage(bool: boolean, joined: boolean) {
    if (!bool) {
      console.log("not bool");
      if (joined) {
        setUserGroupPage((p) => Math.max(1, p - 1));
      } else {
        setNonUserGroupPage((p) => Math.max(1, p - 1));
      }
      return;
    }

    if (joined) {
      console.log("u length", userGroups, userGroups.length);
      if (userGroups.length < 10) {
        return;
      } else {
        console.log("add page");
        setUserGroupPage((p) => p + 1);
        return;
      }
    } else {
      console.log("nu length", nonUserGroups, nonUserGroups.length);
      if (nonUserGroups.length < 10) {
        return;
      } else {
        console.log("add page");
        setNonUserGroupPage((p) => p + 1);
        return;
      }
    }
  }

  return (
    <div className="groupMain">
      <CreateGroup />
      <div className="groupSelectorWrapper">
        <div className="userGroups">
          <h1 className="userGroupTitle glitch-received-message">
            User Groups
          </h1>
          <div className="groupList">
            <div className="cardWrapper">
              {userGroups.map((group) => {
                return (
                  <GroupCard
                    group={group}
                    nonUserGroups={nonUserGroups}
                    setNonUserGroups={setNonUserGroups}
                    userGroups={userGroups}
                    setUserGroups={setUserGroups}
                    key={group.id}
                  />
                );
              })}
            </div>
          </div>
          <div className="groupNavButtons">
            <Button onClick={() => incUserGroupPage(false, true)}>
              Previous
            </Button>
            <span>Page {userGroupPage}</span>
            <Button onClick={() => incUserGroupPage(true, true)}>Next</Button>
          </div>
        </div>
        <div className="userGroups">
          <h1 className="userGroupTitle glitch-received-message">
            Other Groups
          </h1>
          <div className="groupList ">
            <div className="cardWrapper">
              {nonUserGroups.map((group) => {
                return (
                  <GroupCard
                    group={group}
                    nonUserGroups={nonUserGroups}
                    setNonUserGroups={setNonUserGroups}
                    userGroups={userGroups}
                    setUserGroups={setUserGroups}
                    key={group.id}
                  />
                );
              })}
            </div>
          </div>
          <div className="groupNavButtons">
            <Button size="small" onClick={() => incUserGroupPage(false, false)}>
              Previous
            </Button>
            <span>Page {nonUserGroupPage}</span>
            <Button size="small" onClick={() => incUserGroupPage(true, false)}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
