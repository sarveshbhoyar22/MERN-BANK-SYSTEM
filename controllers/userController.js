import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

/**
 * @desc Get all users (Admin only)
 * @route GET /api/users
 * @access Private {Admin}
 */
export const createAdminIfNotExists = async () => {
  const adminExists = await User.findOne({ role: "admin" });

  if (!adminExists) {
    const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);

    await User.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created securely");
  }
};

createAdminIfNotExists();



export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password"); // Exclude password
  res.status(200).json(users);
});

/**
 * @desc Get a single user by ID
 * @route GET /api/users/:id
 * @access Private (User/Admin)
 */
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});

/**
 * @desc Update user details (User can update only their profile)
 * @route PUT /api/users/update/:id
 * @access Private (User/Admin)
 */
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

/**
 * @desc Delete a user (Admin only)
 * @route DELETE /api/users/:id
 * @access Private (Admin)
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await user.remove();
  res.status(200).json({ message: "User deleted successfully" });
});

/**
 * @desc Update user role (Admin only)
 * @route PUT /api/users/update-role
 * @access Private (Admin)
 */
export const updateUserRole = asyncHandler(async (req, res) => {
  const { userId, newRole } = req.body;

  if (!["admin", "manager", "user"].includes(newRole)) {
    res.status(400);
    throw new Error("Invalid role");
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  user.role = newRole;
  await user.save();

  res.json({ message: `User role updated to ${newRole}`, user });
});
