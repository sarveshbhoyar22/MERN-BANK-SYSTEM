import express from "express";
import {Contactus, getUserById, getUsers, updateUser} from "../controllers/userController.js"
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import { getProfile } from "../controllers/authController.js";
import { getAccountDetails, getAccountDetailsall } from "../controllers/accountController.js";

const router = express.Router();

router.get("/getusers", protect, getUsers);
router.post("/getuser", protect, getUserById);
router.get("/profile", protect, getProfile);
router.put("/update-User", protect, updateUser);
router.post("/admin", protect, adminOnly, getProfile);
router.post("/getaccountdetails", protect, getAccountDetailsall);
router.post("/contact",Contactus);

export default router;
