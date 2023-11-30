import { Router } from "express";

import {
  getAllDistributionReports,
  getDistributionReportById,
  createDistributionReport,
  updateDistributionReport,
  deleteDistributionReport,
} from "../Controllers/distributionReportController.js";

export const router = Router();

router.get("/", getAllDistributionReports);

// Get a distribution report by ID
router.get("/:id", getDistributionReportById);

// Create a new distribution report
router.post("/", createDistributionReport);

// Update a distribution report by ID
router.put("/:id", updateDistributionReport);

// Delete a distribution report by ID
router.delete("/:id", deleteDistributionReport);
