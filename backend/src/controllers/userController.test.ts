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

jest.mock("../services/userService");

// const mockPool = {
//   connect: jest.fn().mockReturnValue({
//     query: jest.fn(),
//     release: jest.fn(),
//   }),
// } as unknown as Pool;

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

  // afterEach(() => {
  //   jest.clearAllMocks();
  // });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      const users = [{ id: 1, name: "John Doe", role: "admin" }];
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
      const mockUser = { id: 1, name: "John", role: "admin" };
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
      const newUser = { id: 1, name: "John Doe", role: "admin" };
      req.body = { name: newUser.name, role: newUser.role };

      (UserService.prototype.createUser as jest.Mock).mockResolvedValue(
        newUser
      );

      await createUser(req as Request, res as Response, pool);

      expect(UserService.prototype.createUser).toHaveBeenCalledWith(
        newUser.name,
        newUser.role
      );
      expect(res.json).toHaveBeenCalledWith(newUser);
    });

    it("should handle errors", async () => {
      req.body = { name: "John Doe", role: "admin" };
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
      const mockUser = { id: 1, name: "John", role: "admin" };
      if (!req.params) req.params = {};
      req.params.id = "1";
      req.body = { name: "John", role: "admin" };
      UserService.prototype.updateUser = jest.fn().mockResolvedValue(mockUser);

      await updateUser(req as Request, res as Response, pool);

      expect(UserService.prototype.updateUser).toHaveBeenCalledWith(
        1,
        "John",
        "admin"
      );
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it("should handle errors", async () => {
      const errorMessage = "Error updating user";
      if (!req.params) req.params = {};
      req.params.id = "1";
      req.body = { name: "John", role: "admin" };
      UserService.prototype.updateUser = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      await updateUser(req as Request, res as Response, pool);

      expect(UserService.prototype.updateUser).toHaveBeenCalledWith(
        1,
        "John",
        "admin"
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("deleteUser", () => {
    it("should delete a user by id", async () => {
      const mockUser = { id: 1, name: "John", role: "admin" };
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
      const mockUsers = [{ id: 1, name: "John", role: "admin" }];
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
