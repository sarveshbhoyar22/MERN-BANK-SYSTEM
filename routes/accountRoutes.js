import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { updateUserRole } from "../controllers/userController.js";
import {
  getAccountDetails,
  depositMoney,
  withdrawMoney,
  transferMoney
} from "../controllers/accountController.js";


const router = express.Router();
 
router.get("/:id", protect, getAccountDetails);
router.post("/deposit/:id", protect, depositMoney);
router.post("/withdraw/:id", protect, withdrawMoney);
router.post("/transfer", protect, transferMoney);
router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin!" });
}); 
router.put("/update-role", protect, adminOnly, updateUserRole);
 
export default router; 
 