import express from "express";
import cors from "cors";
import userRoutes from "./routes/user";
import settingRoutes from "./routes/settings";
import spendingRoutes from "./routes/spending";
import authRoutes from "./routes/auth";
import bodyParser from "body-parser";
import { authenticateToken } from "./middleware/authToken";
import pool from "./db";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*", // or specify your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/auth", authRoutes(pool));
app.use("/users", authenticateToken, userRoutes(pool));
app.use("/settings", authenticateToken, settingRoutes(pool));
app.use("/spending", authenticateToken, spendingRoutes(pool));

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
