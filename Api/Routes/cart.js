import { Router } from "express";
import {
  createCart,
  deleteCart,
  getAllCarts,
  getCartById,
  getUserCart,
  updateCart,
} from "../Controllers/cartController.js";

export const router = Router();

router.post("/:userId", createCart);
router.put("/:id", updateCart);
router.get("/user/:userId", getUserCart);
router.get("/:cartId", getCartById);
router.get("/", getAllCarts);
router.delete("/:id", deleteCart);
