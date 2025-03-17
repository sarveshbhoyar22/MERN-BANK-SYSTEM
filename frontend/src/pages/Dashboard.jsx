// // Purpose: Show an overview of the user’s account.
// // Features:
// // Balance Display: Current account balance
// // Transaction History: List of recent transactions
// // Quick Actions: Deposit, Withdraw, Transfer
// import React from 'react'
// import Mainfile from '../components/DashboardComponents/mainfile'
// import Card from '../components/DashboardComponents/card'
// import { useAuthContext } from '../context/AuthContext';
// import useTransaction from '../hooks/UseTransaction';
// import useScreenSize from '../hooks/Usescreensize';
// import { Link } from 'react-router-dom';


// const Dashboard = () => {
//   const {fetchTransactions} = useTransaction();
//   const { width } = useScreenSize();  

//   const fetchTransaction = async () => {
//     try {
//       await fetchTransactions();
//     }
//     catch (error) {
//       console.error("Error fetching transactions in dashboard:", error);
//     }
//   }

  
//   return (
//     <>
//       {width > 768 ? (
//         <div className=" bg-black ">
         
//             <Mainfile />
         
//           <div className="p-3 flex items-center w-auto m-auto sm:justify-center gap-4">
//             <Card
//               link="/deposit"
//               title="Deposit Money"
//               photo="/second/safe.png"
//               description="Deposit money into your account."
//               buttonname={"Deposit"}
//             />
//             <Card
//               link="/withdraw"
//               title="Withdraw Money"
//               photo="/second/withdraw.png"
//               description="Withdraw money from your account."
//               buttonname={"Withdraw"}
//             />
//             <Card
//               link="/transfer"
//               title="Transfer Money"
//               photo="/second/transfer3.png"
//               description="Transfer money to another account."
//               buttonname={"Transfer"}
//             />

//             <Card
//               link="/checkBalance"
//               title=" Check Balance"
//               photo="/second/checkBalance.png"
//               description="Check your account balance with Security."
//               buttonname={"Check Balance"}
//             />

//             <Card
//               link="/history"
//               title=" Transaction History"
//               photo="/second/history.png"
//               description="View your transaction history."
//               onClick={fetchTransaction}
//               buttonname={"History"}
//             />
//             <Card
//               link="/users"
//               title=" Other Users"
//               photo="/second/user.png"
//               description="Find other users."
//               onClick={fetchTransaction}
//               buttonname={"History"}
//             />
//           </div>
//         </div>
//       ) : (
//         <div className=" bg-black ">
//           <Link to="/profile">
//             <Mainfile />
//           </Link>
//           <div className="p-5 grid grid-cols-2 items-center w-auto m-auto justify-center gap-5">
//             <Card
//               link="/deposit"
//               title="Deposit Money"
//               photo="/second/safe.png"
//               description="Deposit money into your account."
//               buttonname={"Deposit"}
//             />
//             <Card
//               link="/withdraw"
//               title="Withdraw Money"
//               photo="/second/withdraw.png"
//               description="Withdraw money from your account."
//               buttonname={"Withdraw"}
//             />
//             <Card
//               link="/transfer"
//               title="Transfer Money"
//               photo="/second/transfer3.png"
//               description="Transfer money to another account."
//               buttonname={"Transfer"}
//             />

//             <Card
//               link="/checkBalance"
//               title=" Check Balance"
//               photo="/second/checkBalance.png"
//               description="Check your account balance with Security."
//               buttonname={"Check Balance"}
//             />

//             <Card
//               link="/history"
//               title=" Transaction History"
//               photo="/second/history.png"
//               description="View your transaction history."
//               onClick={fetchTransaction}
//               buttonname={"History"}
//             />
//             <Card
//               link="/users"
//               title=" Other Users"
//               photo="/second/user.png"
//               description="Find other users."
//               onClick={fetchTransaction}
//               buttonname={"History"}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Dashboard

import React, { useState } from "react";
import Mainfile from "../components/DashboardComponents/mainfile";
import Card from "../components/DashboardComponents/card";
import { useAuthContext } from "../context/AuthContext";
import useTransaction from "../hooks/UseTransaction";
import useScreenSize from "../hooks/Usescreensize";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { fetchTransactions } = useTransaction();
  const { width } = useScreenSize();

  // State for search input
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTransaction = async () => {
    try {
      await fetchTransactions();
    } catch (error) {
      console.error("Error fetching transactions in dashboard:", error);
    }
  };

  // List of dashboard cards
  const dashboardCards = [
    {
      link: "/transfer",
      title: "Transfer Money",
      photo: "/second/transfer3.png",
      description: "Transfer money to another account.",
      buttonname: "Transfer",
    },
    {
      link: "/history",
      title: "Transaction History",
      photo: "/second/history.png",
      description: "View your transaction history.",
      buttonname: "History",
      onClick: fetchTransaction,
    },
    {
      link: "/deposit",
      title: "Deposit Money",
      photo: "/second/safe.png",
      description: "Deposit money into your account.",
      buttonname: "Deposit",
    },
    {
      link: "/withdraw",
      title: "Withdraw Money",
      photo: "/second/withdraw.png",
      description: "Withdraw money from your account.",
      buttonname: "Withdraw",
    },

    {
      link: "/checkBalance",
      title: "Check Balance",
      photo: "/second/checkBalance.png",
      description: "Check your account balance with security.",
      buttonname: "Check Balance",
    },
    {
      link: "/loanoptions",
      title: "Loan",
      photo: "/second/loan.png",
      description: "Apply for a Secure Loan.",
      buttonname: "Check Balance",
    },
    
    {
      link: "/users",
      title: "Other Users",
      photo: "/second/user.png",
      description: "Find other users.",
      buttonname: "Users",
      onClick: fetchTransaction,
    },
  ];

  // Filter cards based on search input
  const filteredCards = dashboardCards.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {width > 768 ? (
        <div className="bg-black min-h-screen p-5">
          <Mainfile />

          {/* Search Input Field */}
          <div className="flex justify-center mb-5">
            <input
              type="text"
              placeholder="Search ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border-2 border-base-100 placeholder:text-gray rounded-md w-[470px] text-white"
            />
          </div>

          {/* Dashboard Cards */}
          <div className="p-3 flex flex-wrap justify-center gap-4  ">
            {filteredCards.length > 0 ? (
              filteredCards.map((card, index) => <Card key={index} {...card} />)
            ) : (
              <p className="text-white text-center">
                Search for Deposit Money, Withdraw Money, Transfer Money, Check
                Balance, Transaction History, Other Users
              </p>
            )}
          </div>
          <section className="bg-black border border-gray-700 rounded-lg   py-16 px-8 text-center text-gray-300">
            <h2 className="text-3xl font-bold text-blue-400 mb-4">
              📢 Explore Our Blog
            </h2>
            <p className="text-lg text-gray-400">
              Stay updated with the latest financial trends, investment tips,
              and banking insights. Read blogs from experts and share your
              thoughts!
            </p>
            <div className="mt-6">
              <Link to="/blog">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md transition-transform transform hover:scale-105">
                  📖 Read Blogs
                </button>
              </Link>
            </div>
          </section>
        </div>
      ) : (
        <div className="bg-black min-h-screen p-5">
          <Mainfile />

          {/* Search Input Field */}
          <div className="flex justify-center mb-5">
            <input
              type="text"
              placeholder="Search ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border-2 border-base-100 placeholder:text-gray rounded-md w-96 text-white"
            />
          </div>

          {/* Mobile Grid View */}
          <div className="grid grid-cols-2 gap-5 justify-center">
            {filteredCards.length > 0 ? (
              filteredCards.map((card, index) => <Card key={index} {...card} />)
            ) : (
              <p className="text-white text-center col-span-2">
                Search for Deposit Money, Withdraw Money, Transfer Money, Check
                Balance, Transaction History, Other Users
              </p>
            )}
          </div>
          <section className="bg-black border border-gray-700 m-2 mt-4 rounded  py-16 px-8 text-center text-gray-300">
            <h2 className="text-3xl font-bold text-blue-400 mb-4">
              📢 Explore Our Blog
            </h2>
            <p className="text-lg text-gray-400">
              Stay updated with the latest financial trends, investment tips,
              and banking insights. Read blogs from experts and share your
              thoughts!
            </p>
            <div className="mt-6">
              <Link to="/blog">
                <button className="bg-blue-500 hover:cursor-pointer hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md transition-transform transform hover:scale-105">
                  📖 Read Blogs
                </button>
              </Link>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Dashboard;
