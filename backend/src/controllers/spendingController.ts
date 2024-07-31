import { Pool } from "pg";
import { SpendingService } from "../services/spendingService";
import { Request, Response } from "express";

export const getAllSpendings = async (
  req: Request,
  res: Response,
  pool: Pool
) => {
  const spendingService = new SpendingService(pool);
  try {
    const spendings = await spendingService.getAllSpendings();
    res.json(spendings);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const getSpendingById = async (
  req: Request,
  res: Response,
  pool: Pool
) => {
  const spendingService = new SpendingService(pool);
  try {
    const spending = await spendingService.getSpendingById(
      parseInt(req.params.id)
    );
    res.json(spending);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const createSpending = async (
  req: Request,
  res: Response,
  pool: Pool
) => {
  const { user_id, amount, created_at } = req.body;
  const spendingService = new SpendingService(pool);

  const createdAtDate = new Date(created_at);
  try {
    const newSpending = await spendingService.createSpending({
      user_id,
      amount,
      created_at: createdAtDate,
    });
    res.json(newSpending);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const updateSpending = async (
  req: Request,
  res: Response,
  pool: Pool
) => {
  const { user_id, amount, created_at } = req.body;
  const spendingService = new SpendingService(pool);

  const createdAtDate = new Date(created_at);
  try {
    const updatedSpending = await spendingService.updateSpending(
      parseInt(req.params.id),
      { user_id, amount, created_at: createdAtDate }
    );
    res.json(updatedSpending);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const deleteSpending = async (
  req: Request,
  res: Response,
  pool: Pool
) => {
  const spendingService = new SpendingService(pool);
  try {
    const deletedSpending = await spendingService.deleteSpending(
      parseInt(req.params.id)
    );
    res.json(deletedSpending);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};
