import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useScreenSize from "../../hooks/Usescreensize";
import { Link } from "react-router-dom";
import QRCodeComponent from "../QRCode/QRCodeComponent";

const Mainfile = () => {
  const { authUser: user } = useAuthContext();
  const { width } = useScreenSize();

  return (
    <div className="flex justify-center mt-16">
      
        <div className="bg-black m-2 text-white border border-gray-800 shadow-lg p-6 rounded-xl w-[350px] sm:w-[420px] hover:shadow-xl transition-all duration-300">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src="/logo.png"
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-gray-700 shadow-md"
              />
            </div>
            <h2 className="text-2xl font-semibold mt-3">
              {user?.name.toUpperCase()}
            </h2>
            <p className="text-sm text-gray-400">{user?.role}</p>
          </div>

          {/* Account Details */}
          <div className="mt-5 space-y-2 text-center">
            <p className="sm:text-lg text-sm font-medium">
              Account Number:{" "}
              <span className="text-blue-400">
                {user?.account?.accountNumber}
              </span>
            </p>
            <p className="sm:text-lg text-sm font-medium">
              <span className="text-blue-400">{user?.email}</span>
            </p>
          </div>

          <QRCodeComponent accountNumber={user?.account?.accountNumber} />
        </div>
      
    </div>
  );
};

export default Mainfile;
