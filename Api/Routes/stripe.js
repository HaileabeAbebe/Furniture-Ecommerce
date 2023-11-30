import { Router } from "express";
import { creatingCharges } from "../Controllers/stripeController.js";

export const router = Router();

router.post("/payment", creatingCharges);
