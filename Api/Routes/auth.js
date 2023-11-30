import { Router } from "express";
import { registerUser, loginUser } from "../Controllers/authController.js";

export const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
