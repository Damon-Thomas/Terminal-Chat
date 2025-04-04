import app from "../app.js"; // Not "../dist/app.js"
import request from "supertest";
import {
  describe,
  test,
  expect,
  afterAll,
  afterEach,
  beforeAll,
} from "@jest/globals";
import http from "http";
import e from "express";
import exp from "constants";

//user login and signup tests
describe("Test CRUD operations for user", () => {
  let token: string;
  let token2: string;
  let token3: string;
  let userId: string;
  let userId2: string;
  let userId3: string;
  let server: http.Server;
  let messageId: string;
  let groupId: string;
  let groupId2: string;

  beforeAll((done) => {
    server = app.listen(3000, () => {
      console.log("Test server running on port 3000");
      done();
    });
  });

  afterAll((done) => {
    server.close(() => {
      console.log("Test server closed");
      done();
    });
  });

  afterEach(() => {
    // Clear any timers or mocks here
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  test("Invalid Create user", async () => {
    const result = await request(app).post("/user/createUser").send({
      username: "",
      password: "",
      confirmPassword: "password",
    });

    expect(result.status).toBe(400);
  });

  test("Create user", async () => {
    const result = await request(app).post("/user/createUser").send({
      username: "Bob",
      password: "password",
      confirmPassword: "password",
    });
    userId = result.body.id;

    expect(result.status).toBe(200);
    expect(result.body.username).toBe("Bob");
    expect(result.body.token).toBeDefined();
    expect(result.body.success).toBe(true);
  });

  test("Create 2nd user", async () => {
    const result = await request(app).post("/user/createUser").send({
      username: "Julie",
      password: "password",
      confirmPassword: "password",
    });
    userId2 = result.body.id;

    expect(result.status).toBe(200);
    expect(result.body.username).toBe("Julie");
    expect(result.body.token).toBeDefined();
    expect(result.body.success).toBe(true);
  });

  test("Create 3rd user", async () => {
    const result = await request(app).post("/user/createUser").send({
      username: "Alice",
      password: "password",
      confirmPassword: "password",
    });
    userId3 = result.body.id;
    token3 = result.body.token;
    expect(result.status).toBe(200);
    expect(result.body.username).toBe("Alice");
    expect(result.body.token).toBeDefined();
    expect(result.body.success).toBe(true);
  });

  test("Create duplicate user", async () => {
    const result = await request(app).post("/user/createUser").send({
      username: "Bob",
      password: "password",
      confirmPassword: "password",
    });

    expect(result.status).toBe(400);
  });

  test("Incorrect Login", async () => {
    const result = await request(app).post("/user/login").send({
      username: "Bobbsdjasjkdsaasdsad",
      password: "password",
    });
    expect(result.status).toBe(400);
    expect(result.body.failure).toBe(true);
  });

  test("Login user", async () => {
    const result = await request(app).post("/user/login").send({
      username: "Bob",
      password: "password",
    });
    expect(result.status).toBe(200);
    expect(result.body.token).toBeDefined();
    token = result.body.token;
  });

  test("Login 2nd user", async () => {
    const result = await request(app).post("/user/login").send({
      username: "Julie",
      password: "password",
    });
    expect(result.status).toBe(200);
    expect(result.body.token).toBeDefined();
    token2 = result.body.token;
  });
  //
  //
  // actions tests
  describe("Test action operations", () => {
    test("Create message to user", async () => {
      const result = await request(app)
        .post("/action/createMessage")
        .send({
          message: "Hello World",
          sentTo: userId2,
          destinationType: "user",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
      expect(result.body.content).toBe("Hello World");
      expect(result.body.failure).toBe(false);

      messageId = result.body.id;
    });

    test("Like message", async () => {
      const result = await request(app)
        .post("/action/likeMessage")
        .send({
          messageId: messageId,
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
    });

    test("Unlike message", async () => {
      const result = await request(app)
        .delete("/action/unLikeMessage")
        .send({
          messageId: messageId,
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
    });

    test("Add friend", async () => {
      const result = await request(app)
        .post("/action/addFriend")
        .send({
          friendId: userId2,
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
    });

    test("Add friend 2", async () => {
      const result = await request(app)
        .post("/action/addFriend")
        .send({
          friendId: userId3,
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
    });

    test("User 2 adds user 1", async () => {
      const result = await request(app)
        .post("/action/addFriend")
        .send({
          friendId: userId,
        })
        .set("Authorization", `Bearer ${token2}`);
      expect(result.status).toBe(200);
    });

    test("Add friend duplicate", async () => {
      const result = await request(app)
        .post("/action/addFriend")
        .send({
          friendId: userId2,
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
    });

    test("Make Group", async () => {
      const result = await request(app)
        .post("/action/createGroup")
        .send({
          groupName: "Test Group",
        })
        .set("Authorization", `Bearer ${token}`);
      console.log("create group result", result.body);
      expect(result.status).toBe(200);
      groupId = result.body.group.id;
    });

    test("Make 2nd Group with another user", async () => {
      const result = await request(app)
        .post("/action/createGroup")
        .send({
          groupName: "Test Group 2",
        })
        .set("Authorization", `Bearer ${token2}`);
      expect(result.status).toBe(200);
      groupId2 = result.body.group.id;
    });

    test("Make Group duplicate", async () => {
      const result = await request(app)
        .post("/action/createGroup")
        .send({
          groupName: "Test Group",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(400);
      expect(result.body.failure).toBe(true);
      expect(result.body.message).toBe("Group already Exists");
    });

    test("Join group", async () => {
      const result = await request(app)
        .post("/action/joinGroup")
        .send({
          groupId: groupId,
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
    });

    test("Join 2nd Group", async () => {
      const result = await request(app)
        .post("/action/joinGroup")
        .send({
          groupId: groupId2,
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
    });

    test("2nd user joins group2", async () => {
      const result = await request(app)
        .post("/action/joinGroup")
        .send({
          groupId: groupId2,
        })
        .set("Authorization", `Bearer ${token2}`);
      expect(result.status).toBe(200);
    });

    test("Message Group", async () => {
      const result = await request(app)
        .post("/action/createMessage")
        .send({
          message: "Hello Group",
          sentTo: groupId,
          destinationType: "group",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
      expect(result.body.content).toBe("Hello Group");
    });

    //
    //
    //
    //Messages
    describe("Test get operations for messages", () => {
      test("Get Messages between users", async () => {
        const result = await request(app)
          .get("/messages/getMessagesBetweenUsers")
          .send({
            sentToId: userId2,
          })
          .set("Authorization", `Bearer ${token}`);
        expect(result.status).toBe(200);
        expect(result.body.failure).toBe(false);
        expect(result.body.messages[0].content).toBe("Hello World");
      });

      test("Get Group Messages", async () => {
        const result = await request(app)
          .get("/messages/getMessagesToGroup")
          .send({
            groupId: groupId,
          })
          .set("Authorization", `Bearer ${token}`);
        expect(result.status).toBe(200);
        expect(result.body.failure).toBe(false);
        expect(result.body.messages[0].content).toBe("Hello Group");
      });
    });

    test("Set pinned message", async () => {
      const result = await request(app)
        .put("/action/setPinnedMessage")
        .send({
          groupId: groupId,
          content: "Pinned Message",
        })
        .set("Authorization", `Bearer ${token}`);
      console.log("Pinned Message", result.body);
      expect(result.status).toBe(200);
      expect(result.body.pinnedMessage.content).toBe("Pinned Message");
    });

    test("Non admin set pinned message", async () => {
      const result = await request(app)
        .put("/action/setPinnedMessage")
        .send({
          groupId: groupId,
          content: "Hostile Takeover",
        })
        .set("Authorization", `Bearer ${token2}`);
      console.log("Hostile Takeover", result.body);
      expect(result.status).toBe(403);
      expect(result.body.message).toBe("User is not the group administrator!");
    });

    test("Overwrite pinned message", async () => {
      const result = await request(app)
        .put("/action/setPinnedMessage")
        .send({
          groupId: groupId,
          content: "Pinned Message Updated",
        })
        .set("Authorization", `Bearer ${token}`);
      console.log("Pinned Message Updated", result.body);
      expect(result.status).toBe(200);
      expect(result.body.pinnedMessage.content).toBe("Pinned Message Updated");
    });

    test("Delete pinned message", async () => {
      const result = await request(app)
        .delete("/action/deletePinnedMessage")
        .send({
          groupId: groupId,
        })
        .set("Authorization", `Bearer ${token}`);
      console.log("Delete Pinned Message", result.body);
      expect(result.status).toBe(200);
    });

    //
    //
    //
    //Contacts
    describe("Test get operations for contacts", () => {
      test("Get Currently Talking Users", async () => {
        const result = await request(app)
          .get("/contacts/activeUserContacts")
          .set("Authorization", `Bearer ${token}`);
        expect(result.status).toBe(200);
        expect(result.body.failure).toBe(false);
        expect(result.body.users).toBeDefined();
      });

      test("Get a users groups", async () => {
        const result = await request(app)
          .get("/contacts/getGroups")
          .send({
            groupId: groupId,
          })
          .set("Authorization", `Bearer ${token}`);
        expect(result.status).toBe(200);
        expect(result.body.failure).toBe(false);
      });

      test("Get group members", async () => {
        const result = await request(app)
          .get("/contacts/getGroupMembers")
          .send({
            groupId: groupId,
          })
          .set("Authorization", `Bearer ${token}`);
        expect(result.status).toBe(200);
        expect(result.body.failure).toBe(false);
        expect(result.body.members.length).toBe(1);
      });

      test("Get group members 2", async () => {
        const result = await request(app)
          .get("/contacts/getGroupMembers")
          .send({
            groupId: groupId2,
          })
          .set("Authorization", `Bearer ${token2}`);
        expect(result.status).toBe(200);
        expect(result.body.failure).toBe(false);
        expect(result.body.members.length).toBe(2);
      });

      test("Get friends list", async () => {
        const result = await request(app)
          .get("/contacts/getFriendsList")
          .set("Authorization", `Bearer ${token}`);
        expect(result.status).toBe(200);
        expect(result.body.failure).toBe(false);
        expect(result.body.friends.length).toBe(1);
      });

      test("User 1 Get non contact users", async () => {
        const result = await request(app)
          .get("/contacts/getNonContactUsers")
          .send({
            page: 1,
          })
          .set("Authorization", `Bearer ${token}`);
        expect(result.status).toBe(200);
        expect(result.body.failure).toBe(false);
        expect(result.body.users).toBeDefined();
      });

      test("User 2 Get non contact users", async () => {
        const result = await request(app)
          .get("/contacts/getNonContactUsers")
          .send({
            page: 1,
          })
          .set("Authorization", `Bearer ${token2}`);
        expect(result.status).toBe(200);
        expect(result.body.failure).toBe(false);
        expect(result.body.users).toBeDefined();
      });

      test("Get non contact users out of range", async () => {
        const result = await request(app)
          .get("/contacts/getNonContactUsers")
          .send({
            page: 100,
          })
          .set("Authorization", `Bearer ${token}`);
        expect(result.status).toBe(200);
        expect(result.body.failure).toBe(false);
        expect(result.body.users).toBeDefined();
      });

      test("Get non joined groups", async () => {
        const result = await request(app)
          .get("/contacts/getNonJoinedGroups")
          .send({
            page: 1,
          })
          .set("Authorization", `Bearer ${token2}`);
        expect(result.status).toBe(200);
        expect(result.body.failure).toBe(false);
        expect(result.body.groups).toBeDefined();
      });

      test("Get non joined groups out of range", async () => {
        const result = await request(app)
          .get("/contacts/getNonJoinedGroups")
          .send({
            page: 100,
          })
          .set("Authorization", `Bearer ${token}`);
        expect(result.status).toBe(200);
        expect(result.body.failure).toBe(false);
        expect(result.body.groups).toBeDefined();
      });
    });

    //
    //
    //
    //Profile
    describe("Test get operations for profile", () => {
      test("Get User Profile", async () => {
        const result = await request(app)
          .get("/profile/getProfile")
          .set("Authorization", `Bearer ${token}`);
        expect(result.status).toBe(200);
        expect(result.body.failure).toBe(false);
        expect(result.body.color).toBe("#74121D");
        expect(result.body.bio).toBe("Bio");
        expect(result.body.intro).toBe("Intro");
      });
      test("Update User Profile", async () => {
        const result = await request(app)
          .post("/profile/updateProfile")
          .send({
            color: "#000000",
            bio: "Hello World",
            intro: "Hello",
          })
          .set("Authorization", `Bearer ${token}`);
        expect(result.status).toBe(200);
        expect(result.body.failure).toBe(false);
        expect(result.body.color).toBe("#000000");
        expect(result.body.bio).toBe("Hello World");
        expect(result.body.intro).toBe("Hello");
      });
    });

    //
    //
    //
    //Tear Down

    test("Remove friend", async () => {
      const result = await request(app)
        .delete("/action/removeFriend")
        .send({
          friendId: userId2,
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
    });

    test("Leave group", async () => {
      const result = await request(app)
        .delete("/action/leaveGroup")
        .send({
          groupId: groupId,
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
    });

    test("Wrong user delete group", async () => {
      const result = await request(app)
        .delete("/action/deleteGroup")
        .send({
          groupId: groupId,
        })
        .set("Authorization", `Bearer ${token2}`);
      console.log("Wrong User Delete Group", result.body);
      expect(result.status).toBe(403);
      expect(result.body.message).toBe("User is not the group administrator!");
    });

    test("Delete group", async () => {
      const result = await request(app)
        .delete("/action/deleteGroup")
        .send({
          groupId: groupId,
        })
        .set("Authorization", `Bearer ${token}`);
      console.log("Delete Group", result.body);
      expect(result.status).toBe(200);
    });

    test("Delete group 2", async () => {
      const result = await request(app)
        .delete("/action/deleteGroup")
        .send({
          groupId: groupId2,
        })
        .set("Authorization", `Bearer ${token2}`);
      console.log("Delete Group 2", result.body);
      expect(result.status).toBe(200);
    });
  });

  //user logout and delete tests
  test("Logout user", async () => {
    if (token !== undefined) {
      const result = await request(app)
        .post("/user/logout")
        .send({
          username: "Bob",
          password: "password",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
    } else {
      console.log("Token is undefined");
      expect(token).toBeDefined();
    }
  });

  test("Delete user 1", async () => {
    const result = await request(app)
      .delete("/user/deleteUser")
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(200);
  });

  test("Delete user 2", async () => {
    const result = await request(app)
      .delete("/user/deleteUser")
      .set("Authorization", `Bearer ${token2}`);
    expect(result.status).toBe(200);
  });

  test("Delete user 3", async () => {
    const result = await request(app)
      .delete("/user/deleteUser")
      .set("Authorization", `Bearer ${token3}`);
    expect(result.status).toBe(200);
  });
});
