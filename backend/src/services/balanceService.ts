import { Pool } from "pg";
import { Balance } from "../models/Balance";

export class BalanceService {
  constructor(private pool: Pool) {}

  async getAllBalances(): Promise<Balance[]> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query<Balance>("SELECT * FROM balances");
      return rows;
    } finally {
      client.release();
    }
  }

  async getBalanceById(id: number): Promise<Balance> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query<Balance>(
        "SELECT * FROM balances WHERE id = $1",
        [id]
      );
      return rows[0];
    } finally {
      client.release();
    }
  }

  async createBalance(balance: number): Promise<Balance> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query<Balance>(
        "INSERT INTO balances (balance) VALUES ($1) RETURNING *",
        [balance]
      );
      return rows[0];
    } finally {
      client.release();
    }
  }

  async updateBalance(id: number, balance: number): Promise<Balance> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query<Balance>(
        "UPDATE balances SET balance = $1 WHERE id = $2 RETURNING *",
        [balance, id]
      );
      return rows[0];
    } finally {
      client.release();
    }
  }

  async deleteBalance(id: number): Promise<Balance> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query<Balance>(
        "DELETE FROM balances WHERE id = $1 RETURNING *",
        [id]
      );
      return rows[0];
    } finally {
      client.release();
    }
  }
}
