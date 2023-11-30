import { Router } from "express";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../Middleware/VerifyToken.js";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserStatistics,
} from "../Controllers/userController.js";

export const router = Router();

router.get("/", getUsers);
router.get("/stats", getUserStatistics);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
