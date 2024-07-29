import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Pool } from "pg";
import userRoutes from "./routes/user";
import balanceRoutes from "./routes/balance";
import spendingRoutes from "./routes/spending";

dotenv.config();

const app = express();
const port = 3000;

const pool: Pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT as string),
});

app.use(cors());

app.use(express.json());

app.use("/users", userRoutes(pool));
app.use("/balances", balanceRoutes(pool));
app.use("/spending", spendingRoutes(pool));

pool.connect((err, client, release) => {
  if (err) {
    console.error("Error acquiring client", err.stack);
    process.exit(-1);
  } else {
    console.log("Connected to the database");
    release();

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  }
});
