import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
  getUserCount,
} from "../controllers/userController";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.delete("/", deleteAllUsers);
router.get("/count", getUserCount);

export default router;
