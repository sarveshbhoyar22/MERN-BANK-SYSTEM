
import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";

const TransferMoney = () => {
  const [receiverAccountNumber, setAccountNumber] =
    React.useState("6940848846");
  const [amount, setAmount] = React.useState("");
  const { authUser: user } = useAuthContext();
  const [loading, setloading] = React.useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setloading(true);

    document.getElementById("my_modal_1").showModal();

    setTimeout(() => {
      setAmount(amount);
      setloading(false);
    }, 3000);

    const user_id = user.account;
    const userId = user_id._id;
    const stringuserId = userId.toString();
    // console.log(userId);

    console.log(receiverAccountNumber, amount);

    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/account/transfer`,
        {
          amount,
          receiverAccountNumber,
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
            <fieldset className="fieldset w-xs h-96 flex flex-col justify-center bg-base-200 border border-base-300 p-4 rounded-box">
              <div className="text-center title p-5 text-2xl font-bold flex items-center gap-2 justify-left">
                <img src="/second/transfer3.png" className="w-15" alt="" />
                <span>Transfer Money</span>
              </div>
              <label className="fieldset-label">Receiver Account Number</label>
              <input
                type="accountNumber"
                className="input"
                placeholder="Type Your Account_Number"
                value={receiverAccountNumber}
                autoFocus
                onChange={(e) => setAccountNumber(e.target.value)}
              />

              <label className="fieldset-label">Amount</label>
              <input
                type="amount"
                className="input"
                placeholder="$1000"
                value={amount}
                onFocus={(e) => (e.target.value = "")}
                maxLength={5}
                required
                onChange={(e) => setAmount(e.target.value)}
              />

              <button className="btn btn-neutral mt-4">Send Money</button>
            </fieldset>
          </form>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal h-full">
        <div className="modal-box border-2 h-1/2 border-green-800 flex flex-col justify-center items-center overflow-hidden">
          {/* <h3 className="font-bold text-2xl absolute justify-center"></h3> */}
          <div className="py-4">
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
                <span className="text-xl font-bold text-center">
                  Your have successfully transfered{" "}
                  <br />
                  <span>
                    ${amount} to {receiverAccountNumber}
                  </span>
                </span>
                {/* <span className="text-3xl font-bold">${amount}.00</span> */}
              </div>
            )}
          </div>
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

export default TransferMoney;
