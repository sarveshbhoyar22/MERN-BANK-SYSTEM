import asyncHandler from "express-async-handler";
import Account from "../models/Account.js";
import User from "../models/User.js";
import  Transaction from "../models/Transaction.js";

  

// ✅ Get account details (Only for the account owner)
export const getAccountDetails = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id);
  const account = await Account.findOne({ user: user._id });

  if (!account) {
    res.status(404);
    throw new Error("Account not found");
  }

  res.status(200).json(account);
}); 

// ✅ Deposit money (Only the account owner can deposit)
export const depositMoney = asyncHandler(async (req, res) => {
  const { amount, accountNumber } = req.body;
  const account = await Account.findOne({ accountNumber});

  if (!account) {
    res.status(404);
    throw new Error("Account not found");
  }

  if (amount <= 0) {
    res.status(400);
    throw new Error("Invalid deposit amount");
  }

  account.balance += parseInt(amount);
  await account.save();

  res
    .status(200)
    .json({
      message: `₹${amount} deposited successfully`,
      balance: account.balance,
    });
});

// ✅ Withdraw money (Only if user has enough balance)
export const withdrawMoney = asyncHandler(async (req, res) => {
  const { amount, accountNumber } = req.body;
  const account = await Account.findOne({ accountNumber });

  if (!account) {
    res.status(404);
    throw new Error("Account not found");
  }

  if (amount <= 0) {
    res.status(400);
    throw new Error("Invalid withdrawal amount");
  }

  if (account.balance < amount) {
    res.status(400);
    throw new Error("Insufficient funds for withdrawal");
  }

  account.balance = account.balance - parseInt(amount);
  await account.save();

  res
    .status(200)
    .json({
      message: `₹${amount} withdrawn successfully`,
      balance: account.balance,
    });
});

// ✅ Transfer money (User can transfer to another account)
export const transferMoney = asyncHandler(async (req, res) => {
  const { amount,receiverAccountNumber } = req.body;

  const senderAccount = await Account.findOne({ user: req.user._id });

  
  const receiverAccount = await Account.findOne({
    accountNumber: receiverAccountNumber,
  });

  if (!senderAccount) {
    res.status(404);
    throw new Error("Sender account not found");
  }

  if (!receiverAccount) {
    res.status(404);
    throw new Error("Receiver account not found");
  }

  if (amount <= 0) {
    res.status(400);
    throw new Error("Invalid transfer amount");
  }

  if (senderAccount.balance < amount) {
    res.status(400);
    throw new Error("Insufficient funds for transfer");
  }

  senderAccount.balance -= parseInt(amount);
  receiverAccount.balance += parseInt(amount);

  await senderAccount.save();
  await receiverAccount.save();

  // Log transaction
  const transaction =await Transaction.create({
    sender: senderAccount.user,
    receiver: receiverAccount.user,
    amount,
    type: "transfer",
    date: new Date(),
  });

  await transaction.save();

  res.json({
    message: "Amount Rs." + amount + " Transfered successfully to this account :" + receiverAccount.accountNumber,
    senderBalance: senderAccount.balance
  });

  res.status(200).json({
    message: `₹${amount} transferred successfully`,
    senderBalance: senderAccount.balance,
  });
}); 

// ✅ Delete an account (Admin only)
export const deleteAccount = asyncHandler(async (req, res) => {
  const account = await Account.findByIdandDelete(req.params.id);

  if (!account) {
    res.status(404);
    throw new Error("Account not found");
  }

  await account.deleteOne();
  res.status(200).json({ message: "Account deleted successfully" });
});
 