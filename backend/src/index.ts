import express from "express";
import { Pool } from "pg";
import userRoutes from "./routes/user";

const app = express();
const port = 3000;

const pool: Pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT as string),
});

app.use(express.json());

app.use((req, res, next) => {
  req.pool = pool;
  next();
});

app.use("/users", userRoutes(pool));

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
