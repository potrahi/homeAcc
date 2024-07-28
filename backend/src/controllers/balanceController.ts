import { Pool } from "pg";
import { Request, Response } from "express";
import { BalanceService } from "../services/balanceService";

export const getAllBalances = async (
  req: Request,
  res: Response,
  pool: Pool
) => {
  const balanceService = new BalanceService(pool);
  try {
    const balances = await balanceService.getAllBalances();
    res.json(balances);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const getBalanceById = async (
  req: Request,
  res: Response,
  pool: Pool
) => {
  const balanceService = new BalanceService(pool);
  try {
    const balance = await balanceService.getBalanceById(
      parseInt(req.params.id)
    );
    res.json(balance);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const createBalance = async (
  req: Request,
  res: Response,
  pool: Pool
) => {
  const { balance } = req.body;
  const balanceService = new BalanceService(pool);
  try {
    const newBalance = await balanceService.createBalance(balance);
    res.json(newBalance);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const updateBalance = async (
  req: Request,
  res: Response,
  pool: Pool
) => {
  const { balance } = req.body;
  const balanceService = new BalanceService(pool);
  try {
    const updatedBalance = await balanceService.updateBalance(
      parseInt(req.params.id),
      balance
    );
    res.json(updatedBalance);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

export const deleteBalance = async (
  req: Request,
  res: Response,
  pool: Pool
) => {
  const balanceService = new BalanceService(pool);
  try {
    const balance = await balanceService.deleteBalance(parseInt(req.params.id));
    res.json(balance);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};
