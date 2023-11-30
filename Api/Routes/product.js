import { Router } from "express";
import {
  addProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../Controllers/productControllers.js";
import upload from "../Middleware/uploadSingleFile.js";
export const router = Router();

router.post("/", upload.single("image"), addProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);
