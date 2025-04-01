import { useContext, useEffect, useState } from "react";
import getContacts from "../../fetchers/getContacts";
import Button from "../Buttons/Button";
import sendActions from "../../fetchers/sendActions";
import { CurrentConvoContext } from "../../context/CurrentConvoContext";
import contactActions from "../../context/ContactActions";

export default function FriendContacts() {
  interface User {
    id: string;
    username: string;
    friend: boolean;
  }

  //   const [friendContacts, setfriendContacts] = useState<User[]>([]);

  const [friendPage, setFriendPage] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  // const context = useContext(CurrentConvoContext);
  // if (!context) {
  //   throw new Error("CurrentConvoContext is null. Ensure the provider is set.");
  // }
  // const { selectedContact, setSelectedContact } = context;

  useEffect(() => {
    async function getFriendContacts() {
      const users = await getContacts.getFriendsList(1);
      console.log("No more users?", users);
      if (users.length > 0) {
        setFriendPage(users.map((user: User) => ({ ...user, friend: true })));
      } else {
        setFriendPage([]);
      }
    }
    getFriendContacts();
  }, []);

  async function removeFriend(friendId: string) {
    const response = await sendActions.removeFriend(friendId);
    if (response) {
      console.log("Friend removed");
      const user = friendPage.find((user) => user.id === friendId);
      if (user) {
        const index = friendPage.indexOf(user);
        friendPage.splice(index, 1);
      }
      setFriendPage([...friendPage]);
    } else {
      console.log("Error removing friend");
    }
  }

  async function addFriend(friendId: string) {
    const response = await sendActions.addFriend(friendId);
    if (response) {
      console.log("Friend added");
      const user = friendPage.find((user) => user.id === friendId);
      if (user) {
        user.friend = true;
      }
      setFriendPage([...friendPage]);
    } else {
      console.log("Error adding friend");
    }
  }

  function messageFriend(friendId: string, username: string) {
    contactActions.storeContact({
      id: friendId,
      username: username,
      group: false,
    });
    location.href = "/messages";
  }

  async function handlePageChange(newPage: number) {
    console.log("Page changed", newPage);
    if (newPage < 1) {
      return;
    }

    const users = await getContacts.getFriendsList(newPage);
    console.log("No more users?", users);
    if (users.length > 0) {
      setPage(newPage);

      setFriendPage(
        users.map((user: User) => ({
          ...user,
          friend: true,
        }))
      );
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
              <Button onClick={() => messageFriend(user.id, user.username)}>
                Message
              </Button>
              <Button onClick={() => addFriend(user.id)}>Add Friend</Button>
            </div>
          ) : (
            <div key={user.id} className="flex flex-col gap-2">
              <h2>{user.username}</h2>
              <Button onClick={() => messageFriend(user.id, user.username)}>
                Message
              </Button>
              <Button onClick={() => removeFriend(user.id)}>
                Delete Friend
              </Button>
            </div>
          )
        )}
      </div>

      <div className="flex justify-center mt-4 gap-2">
        <Button onClick={() => handlePageChange(page - 1)}>Prev</Button>
        <span>Page {page}</span>
        <Button onClick={() => handlePageChange(page + 1)}>Next</Button>
      </div>
    </div>
  );
}
