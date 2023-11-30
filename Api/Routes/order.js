import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getMonthlyIncome,
  getOrders,
  getUserOrder,
  updateOrder,
} from "../Controllers/orderController.js";

export const router = Router();

router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);
router.get("/", getOrders);
router.get("/user/:userId", getUserOrder);
router.get("/income", getMonthlyIncome);
