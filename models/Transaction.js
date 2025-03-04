import mongoose from "mongoose";
const TransactionSchema = 
    new mongoose.Schema({
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
        },
        amount: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    })

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;