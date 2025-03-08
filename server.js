import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import { createAdminIfNotExists } from "./controllers/userController.js";
import LoanRoutes from "./routes/LoanRoutes.js";
import CookieParser from "cookie-parser";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
// console.log("admin:")
createAdminIfNotExists();
app.use(express.json());
app.use(CookieParser()); 
app.use(
  cors({
    origin: "http://localhost:3000", // Change to your frontend URL
    credentials: true, // ALLOW cookies
  })
);
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/account", accountRoutes);
app.use("/api/loan",LoanRoutes);
 
// Basic Route
app.get("/", (req, res) => {
  res.send("Banking System Backend is Running...");
}); 
 
// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

