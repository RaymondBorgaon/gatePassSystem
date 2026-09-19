import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";

import {
  exportGatePasses,
} from "../controllers/exportController.js";


const router = express.Router();


router.get(
  "/gate-passes",
  authMiddleware,
  exportGatePasses
);


export default router;