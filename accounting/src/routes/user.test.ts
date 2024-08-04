import request from "supertest";
import express from "express";
import { Pool } from "pg";
import userRoutes from "./user";
import * as userController from "../controllers/userController";

jest.mock("pg", () => {
  const mClient = {
    query: jest.fn(),
    release: jest.fn(),
  };
  const mPool = {
    connect: jest.fn(() => Promise.resolve(mClient)),
  };
  return { Pool: jest.fn(() => mPool) };
});

jest.mock("../controllers/userController");

describe("userRouter", () => {
  let pool: Pool;
  let app: express.Application;

  beforeAll(() => {
    pool = new Pool();
    app = express();
    app.use(express.json()); // To handle JSON request bodies
    app.use("/users", userRoutes(pool));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle GET /users request", async () => {
    const mockUsers = [{ id: 1, username: "John" }];
    (userController.getAllUsers as jest.Mock).mockImplementation((req, res) => {
      res.json(mockUsers);
    });

    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
    expect(userController.getAllUsers).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      pool
    );
  });

  it("should handle GET /users/:id request", async () => {
    const mockUser = { id: 1, username: "John" };
    (userController.getUserById as jest.Mock).mockImplementation((req, res) => {
      res.json(mockUser);
    });

    const response = await request(app).get("/users/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
    expect(userController.getUserById).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      pool
    );
  });

  it("should handle POST /users request", async () => {
    const mockUser = { id: 1, username: "John" };
    (userController.createUser as jest.Mock).mockImplementation((req, res) => {
      res.json(mockUser);
    });

    const response = await request(app).post("/users").send({ username: "John" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
    expect(userController.createUser).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      pool
    );
  });

  it("should handle PUT /users/:id request", async () => {
    const mockUser = { id: 1, username: "John" };
    (userController.updateUser as jest.Mock).mockImplementation((req, res) => {
      res.json(mockUser);
    });

    const response = await request(app).put("/users/1").send({ username: "John" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
    expect(userController.updateUser).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      pool
    );
  });

  it("should handle DELETE /users/:id request", async () => {
    const mockUser = { id: 1, username: "John" };
    (userController.deleteUser as jest.Mock).mockImplementation((req, res) => {
      res.json(mockUser);
    });

    const response = await request(app).delete("/users/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
    expect(userController.deleteUser).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      pool
    );
  });

  it("should handle DELETE /users request", async () => {
    const mockUsers = [{ id: 1, username: "John" }];
    (userController.deleteAllUsers as jest.Mock).mockImplementation(
      (req, res) => {
        res.json(mockUsers);
      }
    );

    const response = await request(app).delete("/users");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
    expect(userController.deleteAllUsers).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      pool
    );
  });
});
