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
          <div className="p-3 flex flex-wrap justify-center gap-4 ">
            {filteredCards.length > 0 ? (
              filteredCards.map((card, index) => <Card key={index} {...card} />)
            ) : (
              <p className="text-white text-center">
                Search for Deposit Money, Withdraw Money, Transfer Money, Check
                Balance, Transaction History, Other Users
              </p>
            )}
          </div>
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
        </div>
      )}
    </>
  );
};

export default Dashboard;
