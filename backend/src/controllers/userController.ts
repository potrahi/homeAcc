import { Request, Response } from "express";
import { Pool } from "pg";
import { UserService } from "../services/userService";

const pool: Pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT as string),
});

const userService = new UserService(pool);

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(parseInt(req.params.id));
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, role } = req.body;
  try {
    const user = await userService.createUser(name, role);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { name, role } = req.body;
  try {
    const user = await userService.updateUser(
      parseInt(req.params.id),
      name,
      role
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.deleteUser(parseInt(req.params.id));
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const deleteAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.deleteAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const getUserCount = async (req: Request, res: Response) => {
  try {
    const count = await userService.getUserCount();
    res.json(count);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};
