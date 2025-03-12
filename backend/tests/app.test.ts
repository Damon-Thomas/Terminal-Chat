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

describe("Test CRUD operations for user", () => {
  let token: string;

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

    expect(result.status).toBe(200);
    expect(result.body.username).toBe("Bob");
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

  describe("Test message operations", () => {
    const message = await request(app);
  });

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
