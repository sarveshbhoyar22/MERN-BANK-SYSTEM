import asyncHandler from "express-async-handler";
import Account from "../models/Account.jsx";

// Get User Account Details
export const getAccountDetails = asyncHandler(async (req, res) => {
  const account = await Account.findOne({ user: req.user._id });

  if (account) {
    res.json(account);
  } else {
    res.status(404);
    throw new Error("Account not found");
  }
});

// Deposit Money
export const depositMoney = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  const account = await Account.findOne({ user: req.user._id });

  if (!account) {
    res.status(404);
    throw new Error("Account not found");
  }

  account.balance += amount;
  await account.save();
  res.json({ message: "Deposit successful", balance: account.balance });
});

// Withdraw Money
export const withdrawMoney = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  const account = await Account.findOne({ user: req.user._id });

  if (!account) {
    res.status(404);
    throw new Error("Account not found");
  }

  if (account.balance < amount) {
    res.status(400);
    throw new Error("Insufficient balance");
  }

  account.balance -= amount;
  await account.save();
  res.json({ message: "Withdrawal successful", balance: account.balance });
});
