import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool: Pool = new Pool({
  user: process.env.ACC_DB_USER,
  host: process.env.ACC_DB_HOST,
  database: process.env.ACC_DB_NAME,
  password: process.env.ACC_DB_PASSWORD,
  port: parseInt(process.env.ACC_DB_PORT as string),
});

pool.on("error", (err: Error) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export default pool;
