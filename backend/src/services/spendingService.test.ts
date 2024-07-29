import { Pool, PoolClient } from "pg";
import { SpendingService } from "../services/spendingService";
import { Spending } from "../models/Spending";

jest.mock("pg", () => {
  const mClient = {
    query: jest.fn(),
    release: jest.fn(),
  };
  const mPool = {
    connect: jest.fn(() => mClient),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe("SpendingService", () => {
  let pool: Pool;
  let client: PoolClient;
  let spendingService: SpendingService;

  beforeEach(async () => {
    pool = new Pool();
    client = await pool.connect();
    spendingService = new SpendingService(pool);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all spendings", async () => {
    const mockSpendings: Spending[] = [
      { id: 1, user_id: 1, amount: 100, created_at: new Date() },
      { id: 2, user_id: 2, amount: 200, created_at: new Date() },
    ];

    (client.query as jest.Mock).mockResolvedValue({ rows: mockSpendings });

    const result = await spendingService.getAllSpendings();

    expect(result).toEqual(mockSpendings);
    expect(client.query).toHaveBeenCalledWith("SELECT * FROM spendings");
    expect(client.release).toHaveBeenCalled();
  });

  it("should return a spending by ID", async () => {
    const mockSpending: Spending = {
      id: 1,
      user_id: 1,
      amount: 100,
      created_at: new Date(),
    };

    (client.query as jest.Mock).mockResolvedValue({ rows: [mockSpending] });

    const result = await spendingService.getSpendingById(1);

    expect(result).toEqual(mockSpending);
    expect(client.query).toHaveBeenCalledWith(
      "SELECT * FROM spendings WHERE id = $1",
      [1]
    );
    expect(client.release).toHaveBeenCalled();
  });

  it("should create a new spending", async () => {
    const newSpending: Spending = {
      user_id: 1,
      amount: 100,
      created_at: new Date(),
    };

    const createdSpending: Spending = {
      id: 1,
      ...newSpending,
    };

    (client.query as jest.Mock).mockResolvedValue({
      rows: [createdSpending],
    });

    const result = await spendingService.createSpending(newSpending);

    expect(result).toEqual(createdSpending);
    expect(client.query).toHaveBeenCalledWith(
      "INSERT INTO spendings (user_id, amount, create_at) VALUES ($1, $2, $3) RETURNING *",
      [newSpending.user_id, newSpending.amount, newSpending.created_at]
    );
    expect(client.release).toHaveBeenCalled();
  });

  it("should update an existing spending", async () => {
    const updatedSpending: Spending = {
      id: 1,
      user_id: 1,
      amount: 150
    };

    (client.query as jest.Mock).mockResolvedValue({
      rows: [updatedSpending],
    });

    const result = await spendingService.updateSpending(1, updatedSpending);

    expect(result).toEqual(updatedSpending);
    expect(client.query).toHaveBeenCalledWith(
      "UPDATE spendings SET user_id = $1, amount = $2 WHERE id = $3 RETURNING *",
      [updatedSpending.user_id, updatedSpending.amount, 1]
    );
    expect(client.release).toHaveBeenCalled();
  });

  it("should delete a spending by ID", async () => {
    const deletedSpending: Spending = {
      id: 1,
      user_id: 1,
      amount: 100,
      created_at: new Date(),
    };

    (client.query as jest.Mock).mockResolvedValue({
      rows: [deletedSpending],
    });

    const result = await spendingService.deleteSpending(1);

    expect(result).toEqual(deletedSpending);
    expect(client.query).toHaveBeenCalledWith(
      "DELETE FROM spendings WHERE id = $1 RETURNING *",
      [1]
    );
    expect(client.release).toHaveBeenCalled();
  });
});
