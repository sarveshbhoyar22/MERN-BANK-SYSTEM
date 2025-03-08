import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Account from "../models/Account.js";
import generateToken from "../utils/generateToken.js";
import { sendEmail } from "../utils/emailService.js";

// Register New User
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, balance = 0 } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password, role: "user", accountId: null });
  const account = await Account.create({
    user: user._id,
    accountNumber: Math.floor(Math.random() * 9000000000) + 1000000000,
    balance: balance,
  });

  console.log("✅ Account created successfully");



  if (user) {
  

    // Automatically create an account for the user
    
    user.accountId = account._id;
    await user.save();

    sendEmail(
      email,
      "Welcome to Our Auth Banking System",
      `Hello ${name},\n\nYour account has been created successfully!`
    );

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      accountId: account._id,
      accountNumber: account.accountNumber,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// User Login
export const loginUser = asyncHandler(async (req, res) => {
  const { email,password } = req.body;


  const user = await User.findOne({ email }).populate("_id");
  const token = generateToken(user._id);
  if (user && (await user.matchPassword(password))) {

     res.cookie("jwt", token, {
       httpOnly: true, // Prevents XSS attacks
       secure: process.env.NODE_ENV === "production", // Secure in production
       sameSite: "strict",
       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
     });

    res.json(
     
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accountId: user.accountId,
        token: token,
      }
    );

    console.log("✅ User logged in successfully");
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("accountId");
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      accountId: user.accountId,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

