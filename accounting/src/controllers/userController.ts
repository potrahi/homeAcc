import { Request, Response } from "express";
import { Pool } from "pg";
import { UserService } from "../services/userService";
import { User } from "../models/User";

export const getAllUsers = async (req: Request, res: Response, pool: Pool) => {
  const userService = new UserService(pool);
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const getUserById = async (req: Request, res: Response, pool: Pool) => {
  const userService = new UserService(pool);
  try {
    const user = await userService.getUserById(parseInt(req.params.id));
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const getUserByName = async (
  req: Request,
  res: Response,
  pool: Pool,
  username: string
): Promise<User | null> => {
  const userService = new UserService(pool);
  try {
    const user = await userService.getUserByName(username);
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
    return null;
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  pool: Pool
): Promise<User | null> => {
  const { username } = req.body;
  const userService = new UserService(pool);
  try {
    const user = await userService.createUser({ username });
    return user;
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
    return null;
  }
};

export const updateUser = async (req: Request, res: Response, pool: Pool) => {
  const { username } = req.body;
  const userService = new UserService(pool);
  try {
    const user = await userService.updateUser(parseInt(req.params.id), {
      username,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const deleteUser = async (req: Request, res: Response, pool: Pool) => {
  const userService = new UserService(pool);
  try {
    const user = await userService.deleteUser(parseInt(req.params.id));
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const deleteAllUsers = async (
  req: Request,
  res: Response,
  pool: Pool
) => {
  const userService = new UserService(pool);
  try {
    const users = await userService.deleteAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};
