import express from "express";
import {
  payement
} from "../controllers/payement.js";
const router = express.Router();

//payement

router.get("/payment-sheet/:amount",payement);

export default router;
