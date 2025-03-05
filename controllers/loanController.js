import asyncHandler from "express-async-handler";
import Loan from "../models/Loan.js";
import Account from "../models/Account.js";

// Apply for a Loan
export const applyForLoan = asyncHandler(async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    res.status(400);
    throw new Error("Invalid loan amount");
  }

  const loan = await Loan.create({
    user: req.user._id,
    amount,
    status: "pending",
  });

  res.json({ message: "Loan application submitted", loan });
});

// Admin Approve/Reject Loan
export const reviewLoan = asyncHandler(async (req, res) => {
  const { loanId, status } = req.body;

  if (!loanId || !["approved", "pending","rejected"].includes(status)) {
    res.status(400);
    throw new Error(" Invalid loan review request ");
  }

  const loan = await Loan.findById(loanId);
  if (!loan) {
    res.status(404);
    throw new Error("Loan not found");
  }

  if (loan.status !== "pending") {
    res.status(400);
    throw new Error("Loan is already reviewed");
  }

  loan.status = status;
  loan.approvedBy = req.user._id;

  if (status === "approved") {
    const account = await Account.findOne({ user: loan.user });
    if (account) {
      account.balance += loan.amount;
      await account.save();
    }
  }

  await loan.save();

  res.json({ message: `Loan ${status} successfully`, loan });
});

// Get User Loans
export const getUserLoans = asyncHandler(async (req, res) => {
  const loans = await Loan.find({ user: req.user._id });
  res.json(loans); 
});

// Get All Loan Requests (Admin Only)
export const getAllLoans = asyncHandler(async (req, res) => {
  const loans = await Loan.find().populate("user", "name email");
  res.json(loans);
});
