import request from "supertest";
import express, { Express } from "express";
import { Pool } from "pg";
import spendingRoutes from "./spending";
import * as spendingController from "../controllers/spendingController";

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

jest.mock("../controllers/spendingController");

describe("Spending Routes", () => {
  let app: Express;
  let pool: Pool;

  beforeEach(() => {
    pool = new Pool();
    app = express();
    app.use(express.json());
    app.use("/spendings", spendingRoutes(pool));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get all spendings", async () => {
    const spendings = [
      { id: 1, user_id: 1, amount: 100, created_at: new Date() },
    ];
    (spendingController.getAllSpendings as jest.Mock).mockImplementation(
      (req, res) => {
        res.json(spendings);
      }
    );

    const response = await request(app).get("/spendings");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      spendings.map((spending) => ({
        ...spending,
        created_at: spending.created_at.toISOString(),
      }))
    );
    expect(spendingController.getAllSpendings).toHaveBeenCalledTimes(1);
  });

  it("should get spending by id", async () => {
    const spending = { id: 1, user_id: 1, amount: 100, created_at: new Date() };
    (spendingController.getSpendingById as jest.Mock).mockImplementation(
      (req, res) => {
        res.json(spending);
      }
    );

    const response = await request(app).get("/spendings/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ...spending,
      created_at: spending.created_at.toISOString(),
    });
    expect(spendingController.getSpendingById).toHaveBeenCalledTimes(1);
  });

  it("should create a new spending", async () => {
    const newSpending = {
      id: 1,
      user_id: 1,
      amount: 100,
      created_at: new Date(),
    };
    (spendingController.createSpending as jest.Mock).mockImplementation(
      (req, res) => {
        res.json(newSpending);
      }
    );

    const response = await request(app)
      .post("/spendings")
      .send({ user_id: 1, amount: 100, created_at: new Date() });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ...newSpending,
      created_at: newSpending.created_at.toISOString(),
    });
    expect(spendingController.createSpending).toHaveBeenCalledTimes(1);
  });

  it("should update a spending", async () => {
    const updatedSpending = {
      id: 1,
      user_id: 1,
      amount: 200,
      created_at: new Date(),
    };
    (spendingController.updateSpending as jest.Mock).mockImplementation(
      (req, res) => {
        res.json(updatedSpending);
      }
    );
    const response = await request(app)
      .put("/spendings/1")
      .send({ user_id: 1, amount: 200, created_at: new Date() });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ...updatedSpending,
      created_at: updatedSpending.created_at.toISOString(),
    });
    expect(spendingController.updateSpending).toHaveBeenCalledTimes(1);
  });

  it("should delete a spending", async () => {
    const deletedSpending = {
      id: 1,
      user_id: 1,
      amount: 100,
      created_at: new Date(),
    };
    (spendingController.deleteSpending as jest.Mock).mockImplementation(
      (req, res) => {
        res.json(deletedSpending);
      }
    );
    const response = await request(app).delete("/spendings/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      ...deletedSpending,
      created_at: deletedSpending.created_at.toISOString(),
    });
    expect(spendingController.deleteSpending).toHaveBeenCalledTimes(1);
  });
});
