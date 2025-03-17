import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { useState, useEffect } from "react";
import moment from "moment";
import UseTransaction from "../../hooks/UseTransaction";
import { useAuthContext } from "../../context/AuthContext";
import useScreenSize from "../../hooks/Usescreensize";
import Goback from "../../components/Goback";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const { authuser: user } = useAuthContext();
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filters, setFilters] = useState({ type: "", status: "", date: "" });
  const { transactions: transactionsData, loading, error } = UseTransaction();
  const { width } = useScreenSize(); // Get screen width for responsiveness

  useEffect(() => {
    if (transactionsData) {
      const formattedTransactions = transactionsData.map((txn) => ({
        _id: txn?._id,
        type: txn?.type || "unknown",
        amount: txn?.amount,
        status: txn?.status,
        date: moment(txn?.createdAt).format("DD-MM-YYYY hh:mm A") || "N/A",
        receiver: txn?.receiver?.user?.name,
        sender: txn?.sender?.user?.name,
        receiverAC: txn?.receiver?.user?.email,
        senderAC: txn?.sender?.user?.email,
      }));
      setFilteredTransactions(formattedTransactions);
      setTransactions(formattedTransactions);
    }
  }, [transactionsData]);

  useEffect(() => {
    let filtered = transactions;
    if (filters.type)
      filtered = filtered.filter((t) => t.type === filters.type);
    if (filters.status)
      filtered = filtered.filter((t) => t.status === filters.status);
    if (filters.date) {
      filtered = filtered.filter(
        (t) =>
          moment(t.date, "DD-MM-YYYY").format("YYYY-MM-DD") === filters.date
      );
    }
    setFilteredTransactions(filtered);
  }, [filters, transactions]);

  const totalInflow = transactions
    .filter((t) => t.type === "deposit")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalOutflow = transactions
    .filter((t) => t.type !== "deposit")
    .reduce((sum, t) => sum + t.amount, 0);
  const highestTransaction = transactions.length
    ? Math.max(...transactions.map((t) => t.amount))
    : 0;

  const exportCSV = () => {
    const ws = XLSX.utils.json_to_sheet(filteredTransactions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, "transactions.xlsx");
  };

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <div className="mt-20">
        <h2 className="text-3xl font-semibold mb-6 flex items-center gap-3">
          <Goback />
          <img src="/second/history.png" className="w-12 h-12" alt="History" />
          Transaction History
        </h2>

        {/* Filters Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <select
            className="select select-bordered bg-gray-900 text-white"
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All Types</option>
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
            <option value="transfer">Transfer</option>
            <option value="loan">Loan</option>
          </select>

          <select
            className="select select-bordered bg-gray-900 text-white"
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="pending">Pending</option>
          </select>

          <input
            type="date"
            className="input input-bordered bg-gray-900 text-white"
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />

          <button
            onClick={exportCSV}
            className="btn bg-blue-800 hover:bg-blue-700 text-white transition hover:scale-105"
          >
            📥 Download Excel
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div className="p-6 border border-gray-700 text-white rounded-lg shadow-lg">
            <h3 className="text-lg">Total Inflow 💰</h3>
            <p className="text-2xl font-bold">${totalInflow}</p>
          </div>
          <div className="p-6 border border-gray-700 text-white rounded-lg shadow-lg">
            <h3 className="text-lg">Total Outflow 💸</h3>
            <p className="text-2xl font-bold">${totalOutflow}</p>
          </div>
          <div className="p-6 border border-gray-700 text-white rounded-lg shadow-lg">
            <h3 className="text-lg">Highest Transaction ⚡</h3>
            <p className="text-2xl font-bold">${highestTransaction}</p>
          </div>
        </div>

        {/* Transaction Table */}
        {width > 768 ? (
          <div className="overflow-x-auto border border-gray-700 rounded-xl shadow-lg">
            <table className="table w-full text-white">
              <thead className="bg-gray-900">
                <tr>
                  <th>ID</th>
                  <th>Amount</th>
                  <th>Sender</th>
                  <th>Receiver</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody className="bg-black">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No Transactions Found
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((txn) => (
                    <tr key={txn._id} className="hover:bg-gray-800 transition">
                      <td>{txn._id.slice(0, 6)}...</td>
                      <td>${txn.amount}</td>
                      <td>{txn.sender}</td>
                      <td>{txn.receiver}</td>
                      <td>{txn.type}</td>
                      <td
                        className={`font-bold ${
                          txn.status === "success"
                            ? "text-green-400"
                            : txn.status === "failed"
                            ? "text-red-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {txn.status}
                      </td>
                      <td>{txn.date}</td>
                    </tr>
                   
                  ))
                )}
               
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            {filteredTransactions.map((txn) => (
              <div
                key={txn._id}
                className="bg-gray-900 p-4 rounded-lg mb-4 shadow-md"
              >
                <p>
                  <span className="font-bold">Amount:</span><span className="text-green-400 m-2 p-2">
                    ${txn.amount}
                    
                    </span>
                </p>
                <p>
                  <span className="font-bold">Type:</span> {txn.type}
                </p>
                <p>
                  <span className="font-bold">Status:</span> {txn.status}
                </p>
                <p>
                  <span className="font-bold">ID:</span> {txn._id}
                </p>
                <p>
                  <span className="font-bold">Sender:</span> {txn.sender}
                </p>
                <p>
                  <span className="font-bold">Receiver:</span> {txn.receiver}
                </p>
                <p>
                  <span className="font-bold">Date and Time:</span> {txn.date}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Transaction;
