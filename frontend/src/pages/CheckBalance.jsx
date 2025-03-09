import React from "react";
import { useAuthContext } from "../context/AuthContext";

const CheckBalance = () => {
  const { authUser: user } = useAuthContext();
  return (
    <>
      {/* ........................... */}
      <div className="h-screen  bg-black m-auto ">
        <div className="flex justify-center items-center h-full">
          {/* ............. */}
          <div
            className="hero min-h-screen mt-32"
            style={{
              backgroundImage: "url(/checkBalanceBackground.jpg)",
            }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Online Auth-BANK</h1>
                <p className="mb-5">
                  Easily view your current account balance in real-time. Stay
                  updated on your available funds before making transactions.
                  This feature ensures financial awareness and helps in managing
                  expenses effectively.
                </p>
                <button
                  className="btn btn-success text-white text-xl p-8"
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  Check Balance
                </button>

                <dialog id="my_modal_1" className="modal h-full">
                  <div className="modal-box">
                    <h3 className="font-bold text-2xl">Account Balance</h3>
                    <p className="py-4">${user.account.balance}</p>
                    <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
          </div>

          {/* ............. */}
        </div>
      </div>
    </>
  );
};

export default CheckBalance;
