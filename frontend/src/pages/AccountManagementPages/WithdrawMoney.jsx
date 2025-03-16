// Purpose: Allow users to deposit money into their account.
// Features:
// Input field for amount
// Calls deposit API
// Updates balance after a successful transaction
import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";

const WithdrawMoney = () => {
  const [amount, setAmount] = React.useState("");
  const { authUser: user } = useAuthContext();
  const [accountNumber] = React.useState(user.accountNumber);
  const [loading, setloading] = React.useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setloading(true);

    document.getElementById("my_modal_1").showModal();

    setTimeout(() => {
      setAmount(amount);
      setloading(false);
    }, 3000);

    
    // console.log(userId);

    console.log(accountNumber, amount);

    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/account/withdraw`,
        {
          amount,
          accountNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
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
            <fieldset className="fieldset w-auto h-96 flex flex-col justify-center bg-base-200 border border-base-300 p-4 rounded-box">
              <div className="text-center title p-5 text-2xl w-auto font-bold flex items-center gap-2 justify-left">
                <img
                  src="/second/withdraw.png"
                  draggable="false"
                  className="w-15"
                  alt=""
                />
                <span>Withdraw Money</span>
              </div>
              <label className="fieldset-label hidden">Account Number 🔒</label>
              <input
                type="accountNumber"
                className="input hidden"
                placeholder="Type Your Account_Number"
                value={accountNumber}
                readOnly
              />

              <label className="fieldset-label">Amount</label>
              <input
                type="amount"
                className="input"
                placeholder="$1000"
                value={amount}
                onFocus={(e) => (e.target.value = "")}
                autoFocus
                maxLength={5}
                required
                onChange={(e) => setAmount(e.target.value)}
              />

              <button className="btn btn-neutral mt-4">Withdraw Money</button>
            </fieldset>
          </form>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal h-full">
        <div className="modal-box border-2 h-1/2 border-green-800 flex flex-col justify-center items-center overflow-hidden">
          {/* <h3 className="font-bold text-2xl absolute justify-center"></h3> */}
          <p className="py-4">
            {loading ? (
              <span className="loading loading-ring loading-xl "></span>
            ) : (
              <div className="flex flex-col items-center ">
                <span className="text-gray-400">
                  <img
                    src="/second/checkBalance.png"
                    className="w-20 animate-pulse"
                    alt=""
                  />{" "}
                </span>{" "}
                <br />
                <span className="text-3xl font-bold">${amount}.00 </span> <br />
                <span className="text-xl font-bold">
                  Debited from your Account
                </span>
              </div>
            )}
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default WithdrawMoney;
