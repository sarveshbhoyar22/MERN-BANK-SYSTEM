import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import Account from "../models/Account.js";
import dotenv from "dotenv";

dotenv.config();


export const createAdminIfNotExists = async () => {
  const adminExists = await User.findOne({ role: "admin" });
 
  if (!adminExists) {
    
    const user = await User.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: "admin",
      accountId: null,
    });
    const account = await Account.create({
      user: user._id,
      accountNumber: process.env.ADMIN_ACCOUNT_NUMBER,
      balance: process.env.ADMIN_BALANCE,
    });

    user.accountId = account._id;
    await user.save();

    console.log("✅ Admin created securely");
  }
};

export const adminInfo = asyncHandler(async (req, res) => {

  const admin = await User.find({ role: "admin" }).select("-password");

  if(admin){
    return res.status(200).json({message:"Admin data fetched successfully",admin})

  }
  else{
    return res.status(404).json({ message: "Admin not found" });
  }

})

// export const getUsers = asyncHandler(async (req, res) => {
//   const users = await User.find().select("password"); // Exclude password
//   res.status(200).json(users);
// });

export const getUsers = asyncHandler(async (req, res) => {
  const { query } = req.query; // Get search query from request

  // Build a search condition to find users by name or account number
  const searchCondition = query
    ? {
        $or: [
          { name: { $regex: query, $options: "i" } }, // Case-insensitive name search
          { accountNumber: query }, // Exact account number match
        ],
      }
    : {};

  const users = await User.find(searchCondition).select("-password"); // Exclude password field
  res.status(200).json(users);
});


export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});

export const updateUser = asyncHandler(async (req, res) => {
  const { role, password, ...updateData } = req.body; // Prevent role updates

  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // User can update only their own profile (unless admin)
  if (
    req.user.role !== "admin" &&
    req.user._id.toString() !== user._id.toString()
  ) {
    res.status(403);
    throw new Error("Unauthorized: You can only update your own profile");
  }

  // Only admins can change roles
  if (role && req.user.role !== "admin") {
    res.status(403);
    throw new Error("Not authorized to change role");
  }

  // Hash new password if provided
  if (password) {
    const salt = await bcrypt.genSalt(10);
    updateData.password = await bcrypt.hash(password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
  }).select("-password");
  res.status(200).json(updatedUser);
});

export const deleteUser = asyncHandler(async (req, res) => {

  const { userId } = req.body;
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({ message: "User deleted successfully" });
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const { userId, newRole } = req.body;

  if (!["admin", "manager", "user"].includes(newRole)) {
    res.status(400);
    throw new Error("Invalid role");
  }

  const user = await User.findById(userId).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.role = newRole;
  await user.save();
 

  res.json({ message: `User role updated to ${newRole}`,user});
});
