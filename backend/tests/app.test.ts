import app from "../app"; // Ensure app is correctly typed as Express instance
import request from "supertest";
import { describe, test, expect } from "@jest/globals";

describe("Test CRUD operations for user", () => {
  describe("Test create user", () => {
    test("It should respond with a 200 status", async () => {
      const result = await request(app).post("/user/createUser").send({
        username: "Bob",
        password: "password",
        confirmPassword: "password",
      });

      expect(result.status).toBe(200);
    });
    //   test("It should save the username and password to the database", async () => {
    //     const result = await request(app).post("/user/createUser").send({
    //       username: "Nomad",
    //       password: "password",
    //       confirmPassword: "password",
    //     });
    //     expect(result.body.username).toBe("Nomad");
    //     expect(result.body.password).toBe("password");
    //   });
    //   test("It should respond with a json object containing the username", async () => {
    //     const result = await request(app).post("/user/createUser").send({
    //       username: "Nomad",
    //       password: "password",
    //       confirmPassword: "password",
    //     });
    //     expect(result.body.username).toBe("Nomad");
    //   });
    // });
    // describe("Test login user", () => {
    //   test("It should respond with a 200 status", async () => {
    //     const result = await request(app).post("/user/login").send({
    //       username: "Nomad",
    //       password: "password",
    //     });
    //     expect(result.status).toBe(200);
    //   });
    // });
    // describe("Test logout user", () => {
    //   test("It should respond with a 200 status", async () => {
    //     const result = await request(app).post("/user/logout").send({
    //       username: "Nomad",
    //       password: "password",
    //     });
    //     expect(result.status).toBe(200);
    //   });
    // });
    // describe("Test delete user", () => {
    //   test("It should respond with a 200 status", async () => {
    //     const result = await request(app).post("/user/deleteUser").send({
    //       username: "Nomad",
    //       password: "password",
    //     });
    //     expect(result.status).toBe(200);
    //   });
  });
});
