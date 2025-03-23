import { useEffect, useState } from "react";
import getContacts from "../../fetchers/getContacts";
import Button from "../Buttons/Button";
import sendActions from "../../fetchers/sendActions";

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
      const updatedUsers = users.map((user: User) => ({
        ...user,
        friend: false,
      }));
      if (users) {
        setNonContacts(users);
      } else {
        setNonContacts(updatedUsers);
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

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg md:text-2xl lg:text-4xl">Non Contacts</h1>
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
            </div>
          ) : (
            <div key={user.id} className="flex flex-col gap-2">
              <h2>{user.username}</h2>
              <p>Friend</p>
            </div>
          )
        )}
      </div>

      <div className="flex justify-center mt-4 gap-2">
        <Button onClick={() => setPage((p) => Math.max(1, p - 1))}>
          Previous
        </Button>
        <span>Page {page}</span>
        <Button onClick={() => setPage((p) => p + 1)}>Next</Button>
      </div>
    </div>
  );
}
