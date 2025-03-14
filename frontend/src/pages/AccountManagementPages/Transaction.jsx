import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { useState, useEffect } from "react";
import moment from "moment";
import UseTransaction from "../../hooks/UseTransaction";
import { useAuthContext } from "../../context/AuthContext";
import useScreenSize from "../../hooks/Usescreensize"; // Ensure correct import

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const { authuser: user } = useAuthContext();
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filters, setFilters] = useState({ type: "", status: "", date: "" });
  const { transactions: transactionsData, loading, error } = UseTransaction();
  const { width } = useScreenSize(); // Get screen width for responsiveness
 

  const showtransaction = () => {
    
  };
  // Fetch Transactions
  useEffect(() => {
    if (transactionsData) {
      console.log("Fetched Transactions:", transactionsData);
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

  // Filter Transactions
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

  // Calculate Summary
  const totalInflow = transactions
    .filter((t) => t.type === "deposit")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalOutflow = transactions
    .filter((t) => t.type !== "deposit")
    .reduce((sum, t) => sum + t.amount, 0);
  const highestTransaction = transactions.length
    ? Math.max(...transactions.map((t) => t.amount))
    : 0;

  // Pie Chart Data
  const categoryData = [
    { name: "Rent", value: 750 },
    { name: "Groceries", value: 200 },
    { name: "Entertainment", value: 300 },
    { name: "Loan EMI", value: 500 },
  ];
  const COLORS = ["#FF5733", "#33FF57", "#3357FF", "#FFC300"];

  // Export CSV Function
  const exportCSV = () => {
    const ws = XLSX.utils.json_to_sheet(filteredTransactions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, "transactions.xlsx");
  };

  return (
    <>
      {width > 768 ? (
        <div className="p-6 bg-black text-white">
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <img
                src="/second/history.png"
                className="w-10 h-10"
                alt="History Icon"
              />
              Transaction History
            </h2>

            {/* Filters */}
            <div
              className={`flex flex-wrap ${
                width < 640 ? "flex-col gap-2" : "gap-4"
              } mb-4`}
            >
              <select
                className="select select-bordered bg-gray-800"
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
              >
                <option value="">All Types</option>
                <option value="deposit">Deposit</option>
                <option value="withdraw">Withdraw</option>
                <option value="transfer">Transfer</option>
                <option value="loan">Loan</option>
              </select>

              <select
                className="select select-bordered bg-gray-800"
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="">All Status</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
                <option value="pending">Pending</option>
              </select>

              <input
                type="date"
                className="input input-bordered bg-gray-800"
                onChange={(e) =>
                  setFilters({ ...filters, date: e.target.value })
                }
              />

              <button onClick={exportCSV} className="btn btn-primary ">
                📥 Download ExcelSheet
              </button>
            </div>

            {/* Summary */}
            <div
              className={`grid ${
                width < 640 ? "grid-cols-1" : "grid-cols-3"
              } gap-4 mb-4`}
            >
              <div className="bg-gray-900 p-6 rounded-lg border-2 border-green-900">
                <h3>Total Inflow: 💰 ${totalInflow}</h3>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border-2 border-red-900">
                <h3>Total Outflow: 💸 ${totalOutflow}</h3>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border-2 border-blue-900">
                <h3>Highest Transaction: ⚡ ${highestTransaction}</h3>
              </div>
            </div>

            {/* Transaction Table */}
            <div className="overflow-x-auto border-2 border-gray-700 rounded-xl">
              <table className="table w-full text-white">
                <thead className="bg-gray-800">
                  <tr>
                    <th>Transaction ID</th>
                    <th>Amount</th>
                    <th>Sender</th>
                    <th>Receiver</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900">
                  {filteredTransactions.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        No Transactions Found
                      </td>
                    </tr>
                  ) : (
                    
                    filteredTransactions.map((txn) => (
                      <tr onClick={showtransaction} key={txn._id} className="hover:bg-gray-700">
                        <td>
                          <div>{txn._id}</div>
                        </td>
                        <td>${txn.amount}</td>
                        <td>
                          {txn.sender} ⬆️
                          <br />
                          {txn.senderAC}
                        </td>
                        <td>
                          {txn.receiver} ⬇️
                          <br />
                          {txn.receiverAC}
                        </td>
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

            
          </div>
        </div>
      ) : (
        <div className="p-6 bg-black text-white">
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <img
                src="/second/history.png"
                className="w-10 h-10"
                alt="History Icon"
              />
              Transaction History
            </h2>

            {/* Filters */}
            <div
              className={`flex flex-wrap ${
                width < 640 ? "flex-col gap-2" : "gap-4"
              } mb-4`}
            >
              <select
                className="select select-bordered bg-gray-800"
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
              >
                <option value="">All Types</option>
                <option value="deposit">Deposit</option>
                <option value="withdraw">Withdraw</option>
                <option value="transfer">Transfer</option>
                <option value="loan">Loan</option>
              </select>

              <select
                className="select select-bordered bg-gray-800"
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="">All Status</option>
                <option value="success">Success</option>
                <option value="failed">Failed</option>
                <option value="pending">Pending</option>
              </select>

              <input
                type="date"
                className="input input-bordered bg-gray-800"
                onChange={(e) =>
                  setFilters({ ...filters, date: e.target.value })
                }
              />
              <button onClick={exportCSV} className="btn btn-primary w-2/3 ">
                📥 Download ExcelSheet
              </button>
            </div>

            {/* Summary */}
            <div
              className={`grid ${
                width < 640 ? "grid-cols-1" : "grid-cols-3"
              } gap-4 mb-4`}
            >
              <div className="bg-gray-900 p-6 rounded-lg border-2 border-green-900">
                <h3>Total Inflow: 💰 ${totalInflow}</h3>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border-2 border-red-900">
                <h3>Total Outflow: 💸 ${totalOutflow}</h3>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border-2 border-blue-900">
                <h3>Highest Transaction: ⚡ ${highestTransaction}</h3>
              </div>
            </div>

            {/* Transaction Table */}
            <div className="overflow-x-auto border-2 border-gray-700 rounded-xl">
              <table className="table w-full text-white">
                <thead className="bg-gray-800">
                  <tr>
                    <th>Transaction ID</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Sender</th>
                    <th>Receiver</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900">
                  {filteredTransactions.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        No Transactions Found
                      </td>
                    </tr>
                  ) : (
                    filteredTransactions.map((txn) => (
                      <tr onClick={showtransaction} key={txn._id} className="hover:bg-gray-700 text-[] ">
                        <td>
                          <div>{txn._id}</div>
                        </td>
                        <td>${txn.amount}</td>
                        <td>{txn.type}</td>
                        <td>
                          {txn.sender} ⬆️
                          <br />
                          {txn.senderAC}
                        </td>
                        <td>
                          {txn.receiver} ⬇️
                          <br />
                          {txn.receiverAC}
                        </td>
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

            {/* Export Buttons */}
          </div>
        </div>
      )}
    </>
  );
};

export default Transaction;
