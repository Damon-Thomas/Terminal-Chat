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
    <div className="flex flex-col gap-4">
      <h1 className="text-lg md:text-2xl lg:text-4xl">New People</h1>
      <div className="flex flex-wrap gap-4">
        {nonContacts.map((user) =>
          !user.friend ? (
            <div key={user.id} className="flex flex-col gap-2">
              <h2>{user.username}</h2>
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
          ) : (
            <div key={user.id} className="flex flex-col gap-2">
              <h2>{user.username}</h2>
              <p>Friend</p>
              <GoToButton
                destination="/messages"
                id={user.id}
                username={user.username}
                group={false}
              >
                Message
              </GoToButton>
            </div>
          )
        )}
      </div>

      <div className="flex justify-center mt-4 gap-2">
        <Button onClick={() => handlePageChange(page - 1, false)}>Prev</Button>
        <span>Page {page}</span>
        <Button onClick={() => handlePageChange(page + 1, true)}>Next</Button>
      </div>
    </div>
  );
}
