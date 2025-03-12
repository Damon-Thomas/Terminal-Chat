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
      expect(result.body.message).toBe("Hello World");

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
      console.log("Like message result: ", result);
    });

    test("Unlike message", async () => {
      const result = await request(app)
        .delete("/action/unLikeMessage")
        .send({
          messageId: messageId,
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
      console.log("Unlike message result: ", result);
    });

    test("Add friend", async () => {
      const result = await request(app)
        .post("/action/addFriend")
        .send({
          friendId: userId2,
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
      console.log("Add friend result: ", result);
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
      console.log("Remove friend result: ", result);
    });

    test("Make Group", async () => {
      const result = await request(app)
        .post("/action/makeGroup")
        .send({
          groupName: "Test Group",
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
      console.log("Make group result: ", result);
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
      console.log("Join group result: ", result);
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
      console.log("Message group result: ", result);
    });

    test("Leave group", async () => {
      const result = await request(app)
        .delete("/action/leaveGroup")
        .send({
          groupId: groupId,
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
      console.log("Leave group result: ", result);
    });

    test("Delete group", async () => {
      const result = await request(app)
        .delete("/action/deleteGroup")
        .send({
          groupId: groupId,
        })
        .set("Authorization", `Bearer ${token}`);
      expect(result.status).toBe(200);
      console.log("Delete group result: ", result);
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
      console.log("Logout result: ", result.body.message);
      expect(result.status).toBe(200);
    } else {
      console.log("Token is undefined");
      expect(token).toBeDefined();
    }
  });

  test("Delete user", async () => {
    const result = await request(app)
      .delete("/user/deleteUser")
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(200);
  });
});
