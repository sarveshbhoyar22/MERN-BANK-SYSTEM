import asyncHandler from "express-async-handler";
import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import { sendEmail } from "../utils/emailService.js";
import Notification from "../models/Notification.js";

// Transfer Money
export const transferMoney = asyncHandler(async (req, res) => {
  const { receiverEmail, amount } = req.body;
  const sender = req.user;

  if (!receiverEmail || !amount || amount <= 0) {
    res.status(400);
    throw new Error("Invalid transfer details");
  }

  const receiver = await User.findOne({ email: receiverEmail });
  if (!receiver) {
    res.status(404);
    throw new Error("Receiver not found");
  }

  const senderAccount = await Account.findOne({ user: sender._id });
  const receiverAccount = await Account.findOne({ user: receiver._id });

  if (!senderAccount || !receiverAccount) {
    res.status(404);
    throw new Error("Sender or receiver account not found");
  }

  if (senderAccount.balance < amount) {
    res.status(400);
    throw new Error("Insufficient balance");
  }

  // Perform Transaction
  senderAccount.balance -= amount;
  receiverAccount.balance += amount;

  await senderAccount.save();
  await receiverAccount.save();

  const transaction = await Transaction.create({
    sender: sender._id,
    receiver: receiver._id,
    amount,
  });

  // ✅ Create a notification for the sender
  const senderNotification = new Notification({
    user: sender.user,
    message: `You sent $${amount} to ${receiver.accountNumber}.`,
    type: "transaction",
  });
  await senderNotification.save();

  // ✅ Create a notification for the receiver
  const receiverNotification = new Notification({
    user: receiver.user,
    message: `You received $${amount} from ${sender.accountNumber}.`,
    type: "transaction",
  });
  await receiverNotification.save();

  // Send Emails
  sendEmail(
    sender.email,
    "Money Transfer Confirmation",
    `You have successfully sent ₹${amount} to ${receiverEmail}.`
  );

  sendEmail(
    receiverEmail,
    "Money Received",
    `You have received ₹${amount} from ${sender.email}.`
  );

  res.json({
    message: "Transfer successful",
    transaction,
  });
});

// Get User Transactions
export const getUserTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({
    $or: [{ sender: req.user._id }, { receiver: req.user._id }],
  }).populate("sender receiver", "name email");

  res.json(transactions);
});