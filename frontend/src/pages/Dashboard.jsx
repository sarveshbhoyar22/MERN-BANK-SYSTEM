// Purpose: Show an overview of the user’s account.
// Features:
// Balance Display: Current account balance
// Transaction History: List of recent transactions
// Quick Actions: Deposit, Withdraw, Transfer
import React from 'react'
import Mainfile from '../components/DashboardComponents/mainfile'
import Card from '../components/DashboardComponents/card'
import { useAuthContext } from '../context/AuthContext';
import useTransaction from '../hooks/UseTransaction';
import useScreenSize from '../hooks/Usescreensize';

const Dashboard = () => {
  const {fetchTransactions} = useTransaction();
  const { width } = useScreenSize();  

  const fetchTransaction = async () => {
    try {
      await fetchTransactions();
    }
    catch (error) {
      console.error("Error fetching transactions in dashboard:", error);
    }
  }

  
  return (
    <>
      {width > 768 ? (
        <div className=" bg-black ">
          <Mainfile />
          <div className="p-3 flex items-center w-auto m-auto sm:justify-center gap-4">
            <Card
              link="/deposit"
              title="Deposit Money"
              photo="/second/safe.png"
              description="Deposit money into your account."
              buttonname={"Deposit"}
            />
            <Card
              link="/withdraw"
              title="Withdraw Money"
              photo="/second/withdraw.png"
              description="Withdraw money from your account."
              buttonname={"Withdraw"}
            />
            <Card
              link="/transfer"
              title="Transfer Money"
              photo="/second/transfer3.png"
              description="Transfer money to another account."
              buttonname={"Transfer"}
            />

            <Card
              link="/checkBalance"
              title=" Check Balance"
              photo="/second/checkBalance.png"
              description="Check your account balance with Security."
              buttonname={"Check Balance"}
            />

            <Card
              link="/history"
              title=" Transaction History"
              photo="/second/history.png"
              description="View your transaction history."
              onClick={fetchTransaction}
              buttonname={"History"}
            />
          </div>
        </div>
      ) : (
        <div className=" bg-black ">
          <Mainfile />
          <div className="p-5 grid grid-cols-2 items-center w-auto m-auto justify-center gap-5">
            <Card
              link="/deposit"
              title="Deposit Money"
              photo="/second/safe.png"
              description="Deposit money into your account."
              buttonname={"Deposit"}
            />
            <Card
              link="/withdraw"
              title="Withdraw Money"
              photo="/second/withdraw.png"
              description="Withdraw money from your account."
              buttonname={"Withdraw"}
            />
            <Card
              link="/transfer"
              title="Transfer Money"
              photo="/second/transfer3.png"
              description="Transfer money to another account."
              buttonname={"Transfer"}
            />

            <Card
              link="/checkBalance"
              title=" Check Balance"
              photo="/second/checkBalance.png"
              description="Check your account balance with Security."
              buttonname={"Check Balance"}
            />

            <Card
              link="/history"
              title=" Transaction History"
              photo="/second/history.png"
              description="View your transaction history."
              onClick={fetchTransaction}
              buttonname={"History"}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard