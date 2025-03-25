import { useEffect, useState } from "react";
import getContacts from "../../fetchers/getContacts";
import Button from "../Buttons/Button";
import sendActions from "../../fetchers/sendActions";

export default function FriendContacts() {
  interface User {
    id: string;
    username: string;
    friend: boolean;
  }

  //   const [friendContacts, setfriendContacts] = useState<User[]>([]);
  const [editedFriendContacts, setEditedFriendContacts] = useState<User[]>([]);
  const [friendPage, setFriendPage] = useState<User[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getFriendContacts() {
      const users = await getContacts.getFriendsList();
      const updatedUsers = users.map((user: User) => ({
        ...user,
        friend: true,
      }));
      if (updatedUsers) {
        setEditedFriendContacts(updatedUsers);
      } else {
        setEditedFriendContacts([]);
        console.log("Error getting friend contacts");
      }
    }
    getFriendContacts();
  }, []);

  useEffect(() => {
    async function getFriendPage() {
      const users = editedFriendContacts.slice((page - 1) * 10, page * 10);
      if (users) {
        setFriendPage(users);
      } else {
        setFriendPage([]);
        console.log("Error getting friend contacts");
      }
    }
    getFriendPage();
  }, [page, editedFriendContacts]);

  async function removeFriend(friendId: string) {
    const response = await sendActions.removeFriend(friendId);
    if (response) {
      console.log("Friend removed");
      const user = editedFriendContacts.find((user) => user.id === friendId);
      if (user) {
        const index = editedFriendContacts.indexOf(user);
        editedFriendContacts.splice(index, 1);
      }
      setEditedFriendContacts([...editedFriendContacts]);
    } else {
      console.log("Error removing friend");
    }
  }

  async function addFriend(friendId: string) {
    const response = await sendActions.addFriend(friendId);
    if (response) {
      console.log("Friend added");
      const user = editedFriendContacts.find((user) => user.id === friendId);
      if (user) {
        user.friend = true;
      }
      setEditedFriendContacts([...editedFriendContacts]);
    } else {
      console.log("Error adding friend");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg md:text-2xl lg:text-4xl">Friends</h1>
      <div className="flex flex-wrap gap-4">
        {friendPage.map((user) =>
          !user.friend ? (
            <div key={user.id} className="flex flex-col gap-2">
              <h2>{user.username}</h2>
              <Button onClick={() => {}}>Message</Button>
              <Button onClick={() => removeFriend(user.id)}>
                Delete Friend
              </Button>
            </div>
          ) : (
            <div key={user.id} className="flex flex-col gap-2">
              <h2>{user.username}</h2>
              <Button onClick={() => {}}>Message</Button>
              <Button onClick={() => addFriend(user.id)}>Add Friend</Button>
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
