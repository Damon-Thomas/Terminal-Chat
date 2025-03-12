import app from "../app";
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

//user login and signup tests
describe("Test CRUD operations for user", () => {
  let token: string;
  let token2: string;
  let userId: string;
  let userId2: string;
  let server: http.Server;

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
    let messageId: string;
    let groupId: string;
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
      expect(result.body.newMessage.content).toBe("Hello World");
      expect(result.body.failure).toBe(false);

      messageId = result.body.newMessage.id;
    });

    test("Like message", async () => {
      console.log("Message id: ", messageId);
      const result = await request(app)
        .post("/action/likeMessage")
        .send({
          messageId: messageId,
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
      console.log("Like message result: ", result.body);
    });

    test("Unlike message", async () => {
      const result = await request(app)
        .delete("/action/unLikeMessage")
        .send({
          messageId: messageId,
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
      console.log("Unlike message result: ", result.body);
    });

    test("Add friend", async () => {
      const result = await request(app)
        .post("/action/addFriend")
        .send({
          friendId: userId2,
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
      console.log("Add friend result: ", result.body);
    });

    test("Add friend duplicate", async () => {
      const result = await request(app)
        .post("/action/addFriend")
        .send({
          friendId: userId2,
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(400);
    });

    test("Remove friend", async () => {
      const result = await request(app)
        .delete("/action/removeFriend")
        .send({
          friendId: userId2,
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
      console.log("Remove friend result: ", result.body);
    });

    test("Make Group", async () => {
      const result = await request(app)
        .post("/action/makeGroup")
        .send({
          groupName: "Test Group",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
      console.log("Make group result: ", result.body);
      groupId = result.body.id;
    });

    test("Join group", async () => {
      const result = await request(app)
        .post("/action/joinGroup")
        .send({
          groupId: groupId,
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
      console.log("Join group result: ", result.body);
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
      expect(result.body.message).toBe("Hello Group");
      console.log("Message group result: ", result.body);
    });

    test("Leave group", async () => {
      const result = await request(app)
        .delete("/action/leaveGroup")
        .send({
          groupId: groupId,
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
      console.log("Leave group result: ", result.body);
    });

    test("Delete group", async () => {
      const result = await request(app)
        .delete("/action/deleteGroup")
        .send({
          groupId: groupId,
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
      console.log("Delete group result: ", result.body);
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
});
