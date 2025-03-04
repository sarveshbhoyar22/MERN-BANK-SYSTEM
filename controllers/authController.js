import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Account from "../models/Account.js";
import generateToken from "../utils/generateToken.js";

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


  const user = await User.findOne({ email }).populate("accountId");

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      accountId: user.accountId,
      token: generateToken(user._id),
    });

    console.log("✅ User logged in successfully");
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

