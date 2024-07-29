import { Request, Response, Router } from "express";
import { Pool } from "pg";
import { getSetting, updateSetting } from "../controllers/settingsController";

export default (pool: Pool) => {
  const router = Router();

  router.get("/:setting", (req: Request, res: Response) =>
    getSetting(req, res, pool)
  );

  router.put("/:setting", (req: Request, res: Response) =>
    updateSetting(req, res, pool)
  );
  return router;
};
