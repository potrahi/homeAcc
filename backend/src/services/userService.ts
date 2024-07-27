import { Pool } from "pg";
import { User } from "../models/User";

export class UserService {
  constructor(private pool: Pool) {}

  async getAllUsers(): Promise<User[]> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query<User>("SELECT * FROM users");
      return rows;
    } finally {
      client.release();
    }
  }

  async getUserById(id: number): Promise<User> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query<User>(
        "SELECT * FROM users WHERE id = $1",
        [id]
      );
      return rows[0];
    } finally {
      client.release();
    }
  }

  async createUser(name: string, role: string): Promise<User> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query<User>(
        "INSERT INTO users (name, role) VALUES ($1, $2) RETURNING *",
        [name, role]
      );
      return rows[0];
    } finally {
      client.release();
    }
  }

  async updateUser(id: number, name: string, role: string): Promise<User> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query<User>(
        "UPDATE users SET name = $1, role = $2 WHERE id = $3 RETURNING *",
        [name, role, id]
      );
      return rows[0];
    } finally {
      client.release();
    }
  }

  async deleteUser(id: number): Promise<User> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query<User>(
        "DELETE FROM users WHERE id = $1 RETURNING *",
        [id]
      );
      return rows[0];
    } finally {
      client.release();
    }
  }

  async deleteAllUsers(): Promise<User[]> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query<User>(
        "DELETE FROM users RETURNING *"
      );
      return rows;
    } finally {
      client.release();
    }
  }

  async getUserCount(): Promise<number> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query<{ count: number }>(
        "SELECT COUNT(*) FROM users"
      );
      return rows[0].count;
    } finally {
      client.release();
    }
  }
}
