import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool: Pool = new Pool({
  user: process.env.UTILITY_DB_USER,
  host: process.env.UTILITY_DB_HOST,
  database: process.env.UTILITY_DB_NAME,
  password: process.env.UTILITY_DB_PASSWORD,
  port: parseInt(process.env.UTILITY_DB_PORT as string),
});

pool.on("error", (err: Error) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export default pool;
