import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { adminInfo, deleteUser, updateUserRole } from "../controllers/userController.js";
import {
  getAccountDetails,
  depositMoney,
  withdrawMoney,
  transferMoney
} from "../controllers/accountController.js";
import { getUserTransactions } from "../controllers/transactionController.js";


const router = express.Router();
 
router.get("/:id", protect, getAccountDetails);
router.post("/deposit/:id", protect, depositMoney);
router.post("/withdraw/:id", protect, withdrawMoney);
router.post("/transfer", protect, transferMoney);
router.post("/admin", protect , adminOnly, adminInfo); 
router.put("/update-role", protect, adminOnly, updateUserRole);
router.put("/getusertransaction", protect, adminOnly, getUserTransactions);
router.post("/delete-user", protect, adminOnly, deleteUser);
 
export default router; 
 