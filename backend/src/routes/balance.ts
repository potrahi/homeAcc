import { Request, Response, Router } from "express";
import { Pool } from "pg";
import {
  createBalance,
  deleteBalance,
  getAllBalances,
  getBalanceById,
  updateBalance,
} from "../controllers/balanceController";

export default (pool: Pool) => {
  const router = Router();

  router.get("/", (req: Request, res: Response) =>
    getAllBalances(req, res, pool)
  );
  router.get("/:id", (req: Request, res: Response) =>
    getBalanceById(req, res, pool)
  );
  router.post("/", (req: Request, res: Response) =>
    createBalance(req, res, pool)
  );
  router.put("/:id", (req: Request, res: Response) =>
    updateBalance(req, res, pool)
  );
  router.delete("/:id", (req: Request, res: Response) =>
    deleteBalance(req, res, pool)
  );
  return router;
};
