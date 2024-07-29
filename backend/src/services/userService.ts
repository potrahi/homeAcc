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

  async createUser(user: User): Promise<User> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query<User>(
        "INSERT INTO users (name) VALUES ($1) RETURNING *",
        [user.name]
      );
      return rows[0];
    } finally {
      client.release();
    }
  }

  async updateUser(id: number, user: User): Promise<User> {
    const client = await this.pool.connect();
    try {
      const { rows } = await client.query<User>(
        "UPDATE users SET name = $1 WHERE id = $2 RETURNING *",
        [user.name, id]
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
}
