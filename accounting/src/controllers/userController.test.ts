import { Request, Response } from "express";
import { Pool } from "pg";
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  deleteAllUsers,
} from "./userController";
import { UserService } from "../services/userService";
import { User } from "../models/User";

jest.mock("../services/userService");

describe("User Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let pool: Pool;

  beforeEach(() => {
    req = {
      params: {},
      body: {},
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    pool = {} as Pool;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      const users = [{ id: 1, username: "John Doe" }];
      UserService.prototype.getAllUsers = jest.fn().mockResolvedValue(users);

      await getAllUsers(req as Request, res as Response, pool);

      expect(UserService.prototype.getAllUsers).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(users);
    });

    it("should return 500 if there is an error", async () => {
      const error = new Error("Test Error");
      UserService.prototype.getAllUsers = jest.fn().mockRejectedValue(error);

      await getAllUsers(req as Request, res as Response, pool);

      expect(UserService.prototype.getAllUsers).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });
  describe("getUserById", () => {
    it("should return user by id", async () => {
      const mockUser = { id: 1, username: "John" };
      if (!req.params) req.params = {};
      req.params.id = "1";
      UserService.prototype.getUserById = jest.fn().mockResolvedValue(mockUser);

      await getUserById(req as Request, res as Response, pool);

      expect(UserService.prototype.getUserById).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it("should handle errors", async () => {
      const errorMessage = "Error fetching user";
      if (!req.params) req.params = {};
      req.params.id = "1";
      UserService.prototype.getUserById = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      await getUserById(req as Request, res as Response, pool);

      expect(UserService.prototype.getUserById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
  describe("createUser", () => {
    it("should create a new user", async () => {
      const newUser: User = { id: 1, username: "John Doe" };
      req.body = { username: newUser.username };

      (UserService.prototype.createUser as jest.Mock).mockResolvedValue(
        newUser
      );

      await createUser(req as Request, res as Response, pool);

      expect(UserService.prototype.createUser).toHaveBeenCalledWith({
        username: newUser.username,
      });
    });

    it("should handle errors", async () => {
      req.body = { username: "John Doe" };
      const error = new Error("Test Error");
      (UserService.prototype.createUser as jest.Mock).mockRejectedValue(error);

      await createUser(req as Request, res as Response, pool);

      expect(UserService.prototype.createUser).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });
  describe("updateUser", () => {
    it("should update an existing user", async () => {
      const mockUser: User = { id: 1, username: "John" };
      if (!req.params) req.params = {};
      req.params.id = "1";
      req.body = { username: "John" };
      UserService.prototype.updateUser = jest.fn().mockResolvedValue(mockUser);

      await updateUser(req as Request, res as Response, pool);

      expect(UserService.prototype.updateUser).toHaveBeenCalledWith(1, {
        username: "John",
      });
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it("should handle errors", async () => {
      const errorMessage = "Error updating user";
      if (!req.params) req.params = {};
      req.params.id = "1";
      req.body = { username: "John" };
      UserService.prototype.updateUser = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      await updateUser(req as Request, res as Response, pool);

      expect(UserService.prototype.updateUser).toHaveBeenCalledWith(1, {
        username: "John",
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("deleteUser", () => {
    it("should delete a user by id", async () => {
      const mockUser = { id: 1, username: "John" };
      if (!req.params) req.params = {};
      req.params.id = "1";
      UserService.prototype.deleteUser = jest.fn().mockResolvedValue(mockUser);

      await deleteUser(req as Request, res as Response, pool);

      expect(UserService.prototype.deleteUser).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it("should handle errors", async () => {
      const errorMessage = "Error deleting user";
      if (!req.params) req.params = {};
      req.params.id = "1";
      UserService.prototype.deleteUser = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      await deleteUser(req as Request, res as Response, pool);

      expect(UserService.prototype.deleteUser).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("deleteAllUsers", () => {
    it("should delete all users", async () => {
      const mockUsers = [{ id: 1, username: "John" }];
      UserService.prototype.deleteAllUsers = jest
        .fn()
        .mockResolvedValue(mockUsers);

      await deleteAllUsers(req as Request, res as Response, pool);

      expect(UserService.prototype.deleteAllUsers).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    it("should handle errors", async () => {
      const errorMessage = "Error deleting users";
      UserService.prototype.deleteAllUsers = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      await deleteAllUsers(req as Request, res as Response, pool);

      expect(UserService.prototype.deleteAllUsers).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
