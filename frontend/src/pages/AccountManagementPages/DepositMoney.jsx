// Purpose: Allow users to deposit money into their account.
// Features:
// Input field for amount
// Calls deposit API
// Updates balance after a successful transaction
import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";

const DepositMoney = () => {
  const [accountNumber] = React.useState("6940848846");
  const [amount, setAmount] = React.useState("");
  const { authUser:user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user_id = user.account;
    const userId = user_id._id;
    const stringuserId = userId.toString();
    // console.log(userId);


    
    console.log(accountNumber, amount);

    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    if (!token) {
      console.error("No token found");
      return;
    }
    
    try {
      const response = await axios.post(
        `http://localhost:5000/api/account/deposit/${stringuserId}`,
        {
          amount,
          accountNumber
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        withCredentials: true
        }
      );
      
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <>
      <div className="bg-black flex justify-center items-center h-screen w-auto">
        <div className="mt-20">
          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset w-xs h-64 flex flex-col justify-center bg-base-200 border border-base-300 p-4 rounded-box">
              <label className="fieldset-label">Account Number</label>
              <input
                type="accountNumber"
                className="input"
                placeholder="Type Your Account_Number"
                value={accountNumber}
                readOnly
              />

              <label className="fieldset-label">amount</label>
              <input
                type="amount"
                className="input"
                placeholder="$1000"
                value={amount}
                onFocus={(e) => (e.target.value = "")}
                autoFocus
                maxLength={5}
                onChange={(e) => setAmount(e.target.value)}
              />

              <button className="btn btn-neutral mt-4" type="submit" >
                Deposit Money
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default DepositMoney;
