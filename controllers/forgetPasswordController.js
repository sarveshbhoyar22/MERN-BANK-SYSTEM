import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt, { compare } from "bcryptjs";
import nodemailer from "nodemailer";
import { sendEmail } from "../utils/emailService.js";

const otpStorage = {}; // Temporary storage for OTPs

export const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStorage[email] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 }; // Expires in 10 minutes

  // Configure Nodemailer transporter (Use your SMTP settings)
  sendEmail(
    email,
    "Password Reset OTP",
    `Your OTP for password reset is: ${otp}`
  )

  try {
    
    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Error sending OTP" });
  }
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!otpStorage[email]) {
    res.status(400);
    throw new Error("OTP not requested or expired");
  }

  if (otpStorage[email].otp !== otp) {
    res.status(400);
    throw new Error("Invalid OTP");
  }

  // OTP matched, allow password reset

  // Delete OTP from storage
  delete otpStorage[email];
  res
    .status(200)
    .json({ message: "OTP verified. You can now reset your password." });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;

  // console.log(email,newPassword)
  const user = await User.findOne({ email }); 
  if (!user) { 
    res.status(404);
    throw new Error("User not found");
  }
  

  user.password = newPassword;
  await user.save();
  
  
  

  

  

  res
    .status(200)
    .json({ message: "Password reset successfully. You can now log in." });
}); 

export const verifyoldPassword = asyncHandler(async (req, res) => {
  const { email, oldPassword } = req.body;
  console.log(oldPassword)

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if(!oldPassword === await user.matchPassword(oldPassword)){
    res.status(400);
    throw new Error("Invalid old password");
  }
  
  res.status(200)
    .json({ message: "Password matched" });
});


