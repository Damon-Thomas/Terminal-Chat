import { useEffect, useState } from "react";
import getContacts from "../../fetchers/getContacts";
import Button from "../Buttons/Button";
import sendActions from "../../fetchers/sendActions";
import GoToButton from "./GoToButton";

export default function NonContacts() {
  interface User {
    id: string;
    username: string;
    friend: boolean;
  }

  const [nonContacts, setNonContacts] = useState<User[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getNonContacts() {
      const users = await getContacts.getNonContactUsers(page);
      console.log("No more users?", users);
      if (users.users.length > 0) {
        setNonContacts(
          users.users.map((user: User) => ({ ...user, friend: false }))
        );
      } else {
        setNonContacts([]);
      }
    }
    getNonContacts();
  }, [page]);

  async function addFriend(friendId: string) {
    const response = await sendActions.addFriend(friendId);
    if (response) {
      console.log("Friend added");
      const user = nonContacts.find((user) => user.id === friendId);
      if (user) {
        user.friend = true;
      }
      setNonContacts([...nonContacts]);
    } else {
      console.log("Error adding friend");
    }
  }

  async function handlePageChange(newPage: number, inc: boolean) {
    if (!inc && newPage > 0) {
      setPage(newPage);
      return;
    }

    if (inc) {
      const users = await getContacts.getNonContactUsers(newPage);
      if (users.users.length > 0) {
        setPage(newPage);
        setNonContacts(
          users.users.map((user: User) => ({ ...user, friend: false }))
        );
      }
    }
  }

  return (
    <div className="friend-main">
      <h1 className="userGroupTitle friendsTitle">New People</h1>
      <div className="friendList">
        {nonContacts.map((user) =>
          !user.friend ? (
            <div key={user.id} className="friendCard">
              <h2 className="friendCardTitle glitch-received-message">
                {user.username}
              </h2>
              <div className="butWrap">
                <Button
                  type="button"
                  className=""
                  onClick={() => {
                    addFriend(user.id);
                  }}
                >
                  Add
                </Button>
                <GoToButton
                  destination="/profile"
                  id={user.id}
                  username={user.username}
                  group={false}
                >
                  Profile
                </GoToButton>
              </div>
            </div>
          ) : (
            <div key={user.id} className="friendCard">
              <h2 className="friendCardTitle glitch-received-message">
                {user.username}
              </h2>

              <div className="butWrap">
                <div className="noticeWrapper">
                  <p className="butClickedNotice">Friend</p>
                </div>
                <GoToButton
                  destination="/messages"
                  id={user.id}
                  username={user.username}
                  group={false}
                >
                  Message
                </GoToButton>
              </div>
            </div>
          )
        )}
      </div>

      <div className="contactPageNav">
        <Button onClick={() => handlePageChange(page - 1, false)}>Prev</Button>
        <span>Page {page}</span>
        <Button onClick={() => handlePageChange(page + 1, true)}>Next</Button>
      </div>
    </div>
  );
}
