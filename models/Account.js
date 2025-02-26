import mongoose from "mongoose";

const accountSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    accountNumber: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);

export default Account;
