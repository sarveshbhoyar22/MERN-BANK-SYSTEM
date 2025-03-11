// import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { useState, useEffect } from "react";
import axios from "axios";
import UseTransaction from "../../hooks/UseTransaction";

// Dummy Transaction Data (Replace with API Fetch)
// const transactionsData = [
//   {
//     id: 1,
//     type: "Deposit",
//     amount: 1500,
//     status: "Success",
//     date: "2025-03-01",
//     category: "Salary",
//   },
//   {
//     id: 2,
//     type: "Withdraw",
//     amount: 200,
//     status: "Failed",
//     date: "2025-03-02",
//     category: "Groceries",
//   },
//   {
//     id: 3,
//     type: "Transfer",
//     amount: 750,
//     status: "Success",
//     date: "2025-03-05",
//     category: "Rent",
//   },
//   {
//     id: 4,
//     type: "Loan",
//     amount: 500,
//     status: "Pending",
//     date: "2025-03-07",
//     category: "Loan EMI",
//   },
//   {
//     id: 5,
//     type: "Withdraw",
//     amount: 300,
//     status: "Success",
//     date: "2025-03-10",
//     category: "Entertainment",
//   },
// ];

const Transaction =  () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    status: "",
    date: "",
  });
  
  const { transactions: transactionsData, loading, error } = UseTransaction();
  //  if (loading) return <p>Loading transactions...</p>;
  //  if (error) return <p>Error fetching transactions. Please try again.</p>;

  useEffect(() => {
    const loadTransactions = async () => {
      const data =  transactionsData;
      if(data){
        setTransactions(data);
        setFilteredTransactions(data);
      }
    }

    loadTransactions();
  },[]);





  // Filter Transactions
  useEffect(() => {
    let filtered = transactions;
    if (filters.type)
      filtered = filtered.filter((t) => t.type === filters.type);
    if (filters.status)
      filtered = filtered.filter((t) => t.status === filters.status);
    if (filters.date)
      filtered = filtered.filter((t) => t.date === filters.date);
    setFilteredTransactions(filtered);
  }, [filters, transactions]);

  // Calculate Summary
  const totalInflow = transactions
    .filter((t) => t.type === "Deposit")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalOutflow = transactions
    .filter((t) => t.type !== "Deposit")
    .reduce((sum, t) => sum + t.amount, 0);
  const highestTransaction = Math.max(...transactions.map((t) => t.amount));

  // Pie Chart Data
  const categoryData = [
    { name: "Rent", value: 750 },
    { name: "Groceries", value: 200 },
    { name: "Entertainment", value: 300 },
    { name: "Loan EMI", value: 500 },
  ];
  const COLORS = ["#FF5733", "#33FF57", "#3357FF", "#FFC300"];

  // Download CSV
  const exportCSV = () => {
    const ws = XLSX.utils.json_to_sheet(filteredTransactions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, "transactions.xlsx");
  };

  return (
    <div className="p-6 bg-black text-white">
      <div className="mt-20 ">
        <h2 className="text-2xl font-bold mb-4 flex gap-3">
          <img src="/second/history.png" className="w-10 h-10" alt="" />
          Transaction History
        </h2>

        {/* Filters */}
        <div className="flex gap-4 mb-4">
          <select
            className="select select-bordered bg-gray-800"
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All Types</option>
            <option value="Deposit">Deposit</option>
            <option value="Withdraw">Withdraw</option>
            <option value="Transfer">Transfer</option>
            <option value="Loan">Loan</option>
          </select>

          <select
            className="select select-bordered bg-gray-800"
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Status</option>
            <option value="Success">Success</option>
            <option value="Failed">Failed</option>
            <option value="Pending">Pending</option>
          </select>

          <input
            type="date"
            className="input input-bordered bg-gray-800"
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-4 w-[70%]">
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
        <div className="overflow-y-auto h-96">
          <table className="table w-full text-white">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No Transactions Found
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-700">
                    <td>{txn.id}</td>
                    <td>{txn.type}</td>
                    <td>${txn.amount}</td>
                    <td
                      className={`font-bold ${
                        txn.status === "Success"
                          ? "text-green-400"
                          : "text-red-400"
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

        {/* Charts */}
        {/* <div className="flex justify-center my-6">
          <PieChart width={300} height={300}>
            <Pie
              data={categoryData}
              cx={150}
              cy={150}
              outerRadius={80}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div> */}

        {/* Export Buttons */}
        <div className="flex gap-4">
          <button onClick={exportCSV} className="btn btn-primary">
            📥 Download CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
