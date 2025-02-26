import express from "express";
import { protect } from "../middleware/authMiddleware.jsx";
import {
  getAccountDetails,
  depositMoney,
  withdrawMoney,
} from "../controllers/accountController.jsx";

const router = express.Router();

router.get("/", protect, getAccountDetails);
router.post("/deposit", protect, depositMoney);
router.post("/withdraw", protect, withdrawMoney);

export default router;
