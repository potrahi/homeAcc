import { Pool } from "pg";
import { Spending } from "../models/Spending";

export class SpendingService {
  constructor(private pool: Pool) {}

  async getAllSpendings(): Promise<Spending[]> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query<Spending>(`
        SELECT spendings.id, spendings.user_id, users.username, spendings.amount, spendings.created_at 
        FROM spendings 
        JOIN users ON spendings.user_id = users.id
      `);
      return rows;
    } finally {
      client.release();
    }
  }

  async getSpendingById(id: number): Promise<Spending> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query<Spending>(
        "SELECT * FROM spendings WHERE id = $1",
        [id]
      );
      return rows[0];
    } finally {
      client.release();
    }
  }

  async createSpending(spending: Spending): Promise<Spending> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query<Spending>(
        "INSERT INTO spendings (user_id, amount, created_at) VALUES ($1, $2, $3) RETURNING *",
        [spending.user_id, spending.amount, spending.created_at]
      );
      return rows[0];
    } finally {
      client.release();
    }
  }

  async updateSpending(id: number, spending: Spending): Promise<Spending> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query<Spending>(
        "UPDATE spendings SET user_id = $1, amount = $2 WHERE id = $3 RETURNING *",
        [spending.user_id, spending.amount, id]
      );
      return rows[0];
    } finally {
      client.release();
    }
  }

  async deleteSpending(id: number): Promise<Spending> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query<Spending>(
        "DELETE FROM spendings WHERE id = $1 RETURNING *",
        [id]
      );
      return rows[0];
    } finally {
      client.release();
    }
  }
}
