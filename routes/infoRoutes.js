import express from "express";
import {getUserById, getUsers} from "../controllers/userController.js"
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import { getProfile } from "../controllers/authController.js";
import { getAccountDetails, getAccountDetailsall } from "../controllers/accountController.js";

const router = express.Router();

router.get("/getusers", protect, getUsers);
router.post("/getuser", protect, getUserById);
router.post("/profile", protect, getProfile);
router.post("/admin", protect, adminOnly, getProfile);
router.post("/getaccountdetails", protect, getAccountDetailsall);

export default router;
