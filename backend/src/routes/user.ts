import { Router, Request, Response } from "express";
import { Pool } from "pg";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
} from "../controllers/userController";

export default (pool: Pool) => {
  const router = Router();

  router.get("/", (req: Request, res: Response) => getAllUsers(req, res, pool));
  router.get("/:id", (req: Request, res: Response) =>
    getUserById(req, res, pool)
  );
  router.post("/", (req: Request, res: Response) => createUser(req, res, pool));
  router.put("/:id", (req: Request, res: Response) =>
    updateUser(req, res, pool)
  );
  router.delete("/:id", (req: Request, res: Response) =>
    deleteUser(req, res, pool)
  );
  router.delete("/", (req: Request, res: Response) =>
    deleteAllUsers(req, res, pool)
  );
  return router;
};
