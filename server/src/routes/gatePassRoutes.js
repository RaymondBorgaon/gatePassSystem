import express from "express";
import validate from "../middlewares/validateMiddleware.js";

import {
  createGatePass,
  getAllGatePasses,
  getGatePassById,
  updateGatePass,
  updateGatePassStatus,
  deleteGatePass,
} from "../controllers/gatePassController.js";

import {
  createGatePassSchema,
  updateGatePassSchema,
  updateGatePassStatusSchema,
} from "../validations/gatePassValidation.js";

import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router();

/*
=========================================
GET ALL GATE PASSES
=========================================
*/

router.get(
  "/",
  authMiddleware,
  getAllGatePasses
);


/*
=========================================
GET SINGLE GATE PASS
=========================================
*/

router.get(
  "/:id",
  authMiddleware,
  getGatePassById
);


/*
=========================================
CREATE GATE PASS
=========================================
*/

router.post(
  "/",
  authMiddleware,
  validate(createGatePassSchema),
  createGatePass
);


/*
=========================================
UPDATE GATE PASS
=========================================
*/

router.patch(
  "/:id",
  authMiddleware,
  validate(updateGatePassSchema),
  updateGatePass
);


/*
=========================================
UPDATE STATUS
=========================================
*/

router.patch(
  "/:id/status",
  authMiddleware,
  validate(updateGatePassStatusSchema),
  updateGatePassStatus
);


/*
=========================================
DELETE GATE PASS
=========================================
*/

router.delete(
  "/:id",
  authMiddleware,
  deleteGatePass
);


export default router;