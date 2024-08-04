import { Request, Response, Router } from "express";
import { Pool } from "pg";
import {
  createSpending,
  deleteSpending,
  getAllSpendings,
  getSpendingById,
  updateSpending,
} from "../controllers/spendingController";

export default (pool: Pool) => {
  const router = Router();

  router.get("/", (req: Request, res: Response) =>
    getAllSpendings(req, res, pool)
  );
  router.get("/:id", (req: Request, res: Response) =>
    getSpendingById(req, res, pool)
  );
  router.post("/", (req: Request, res: Response) =>
    createSpending(req, res, pool)
  );
  router.put("/:id", (req: Request, res: Response) =>
    updateSpending(req, res, pool)
  );
  router.delete("/:id", (req: Request, res: Response) =>
    deleteSpending(req, res, pool)
  );
  return router;
};
