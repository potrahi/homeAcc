import { Pool } from "pg";
import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    pool: Pool;
  }
}
