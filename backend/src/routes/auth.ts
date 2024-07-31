import { Request, Response, Router } from "express";
import { Pool } from "pg";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { getUserByName, createUser } from "../controllers/userController";

export default (pool: Pool) => {
  const router = Router();

  router.post("/login", async (req: Request, res: Response) => {
    try {
      const { username } = req.body;
      if (!username) {
        return res.status(400).json({ error: "Username is required" });
      }

      const user = await getUserByName(req, res, pool, username);

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const token = jwt.sign({ username, user_id: user.id }, SECRET_KEY);
      res.json({ success: true, token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.post("/register", async (req: Request, res: Response) => {
    try {
      const { username } = req.body;
      if (!username) {
        return res.status(400).json({ error: "Username is required" });
      }

      const user = await getUserByName(req, res, pool, username);

      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }

      const newUser = await createUser(req, res, pool);

      if (!newUser) {
        return;
      }

      const token = jwt.sign({ username, user_id: newUser.id }, SECRET_KEY);
      res.json({ success: true, token });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
};
