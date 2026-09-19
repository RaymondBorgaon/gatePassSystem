import express from "express";

import {
  getReportSummary,
} from "../controllers/reportController.js";

import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router();


/* =========================================
   REPORT SUMMARY
========================================= */

router.get(
  "/summary",
  authMiddleware,
  getReportSummary
);


export default router;