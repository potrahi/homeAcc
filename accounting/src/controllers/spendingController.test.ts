import { Request, Response } from "express";
import { Pool } from "pg";
import { SpendingService } from "../services/spendingService";
import {
  createSpending,
  deleteSpending,
  getAllSpendings,
  getSpendingById,
  updateSpending,
} from "./spendingController";
import { Spending } from "../models/Spending";

jest.mock("../services/spendingService");

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

  describe("getAllSpendings", () => {
    it("should return all users", async () => {
      const spendings = [
        { id: 1, user_id: 1, amount: 100, created_at: new Date() },
      ];

      SpendingService.prototype.getAllSpendings = jest
        .fn()
        .mockResolvedValue(spendings);

      await getAllSpendings(req as Request, res as Response, pool);

      expect(SpendingService.prototype.getAllSpendings).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(spendings);
    });

    it("should return 500 if there is an error", async () => {
      const error = new Error("Test Error");
      SpendingService.prototype.getAllSpendings = jest
        .fn()
        .mockRejectedValue(error);

      await getAllSpendings(req as Request, res as Response, pool);

      expect(SpendingService.prototype.getAllSpendings).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });
  describe("getSpendingById", () => {
    it("should return user by id", async () => {
      const mockUser = { id: 1, name: "John", role: "admin" };
      if (!req.params) req.params = {};
      req.params.id = "1";
      SpendingService.prototype.getSpendingById = jest
        .fn()
        .mockResolvedValue(mockUser);

      await getSpendingById(req as Request, res as Response, pool);

      expect(SpendingService.prototype.getSpendingById).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it("should handle errors", async () => {
      const errorMessage = "Error fetching sending";
      if (!req.params) req.params = {};
      req.params.id = "1";
      SpendingService.prototype.getSpendingById = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      await getSpendingById(req as Request, res as Response, pool);

      expect(SpendingService.prototype.getSpendingById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
  describe("createSpending", () => {
    it("should create a new sending", async () => {
      const newSpending: Spending = {
        user_id: 1,
        amount: 100,
        created_at: new Date(),
      };
      req.body = { user_id: 1, amount: 100, created_at: new Date() };

      (SpendingService.prototype.createSpending as jest.Mock).mockResolvedValue(
        newSpending
      );

      await createSpending(req as Request, res as Response, pool);

      expect(SpendingService.prototype.createSpending).toHaveBeenCalledWith(
        newSpending
      );
      expect(res.json).toHaveBeenCalledWith(newSpending);
    });

    it("should handle errors", async () => {
      req.body = { name: "John Doe", role: "admin" };
      const error = new Error("Test Error");
      (SpendingService.prototype.createSpending as jest.Mock).mockRejectedValue(
        error
      );

      await createSpending(req as Request, res as Response, pool);

      expect(SpendingService.prototype.createSpending).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });
  describe("updateSpending", () => {
    it("should update an existing sending", async () => {
      const updatedSending: Spending = {
        id: 1,
        user_id: 1,
        amount: 100,
      };
      if (!req.params) req.params = {};
      req.params.id = "1";
      req.body = { user_id: 1, amount: 100 };
      SpendingService.prototype.updateSpending = jest
        .fn()
        .mockResolvedValue(updatedSending);

      await updateSpending(req as Request, res as Response, pool);

      expect(SpendingService.prototype.updateSpending).toHaveBeenCalledWith(1, {
        user_id: 1,
        amount: 100,
      });
      expect(res.json).toHaveBeenCalledWith(updatedSending);
    });

    it("should handle errors", async () => {
      const errorMessage = "Error updating sending";
      if (!req.params) req.params = {};
      req.params.id = "1";
      req.body = { user_id: 1, amount: 100 };
      SpendingService.prototype.updateSpending = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      await updateSpending(req as Request, res as Response, pool);

      expect(SpendingService.prototype.updateSpending).toHaveBeenCalledWith(1, {
        user_id: 1,
        amount: 100,
      });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe("deleteSpending", () => {
    it("should delete a user by id", async () => {
      const mockUser = { id: 1, name: "John", role: "admin" };
      if (!req.params) req.params = {};
      req.params.id = "1";
      SpendingService.prototype.deleteSpending = jest
        .fn()
        .mockResolvedValue(mockUser);

      await deleteSpending(req as Request, res as Response, pool);

      expect(SpendingService.prototype.deleteSpending).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it("should handle errors", async () => {
      const errorMessage = "Error deleting sending";
      if (!req.params) req.params = {};
      req.params.id = "1";
      SpendingService.prototype.deleteSpending = jest
        .fn()
        .mockRejectedValue(new Error(errorMessage));

      await deleteSpending(req as Request, res as Response, pool);

      expect(SpendingService.prototype.deleteSpending).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
