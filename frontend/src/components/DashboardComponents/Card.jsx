import React from "react";
import { Link } from "react-router-dom";

const Card = ({ title, photo, description, buttonname, link = "" }) => {
  return (
    <Link to={link} className="group">
      <div className="bg-black text-white border border-gray-800 shadow-lg rounded-lg sm:w-64 w-40 h-72 p-4 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        {/* Image */}
        <div className="flex justify-center">
          <img
            className="h-24 w-24 object-cover rounded-lg transition-all duration-300 group-hover:scale-110"
            src={photo}
            alt={title}
          />
        </div>

        {/* Card Content */}
        <div className="mt-3 text-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-gray-400 text-sm mt-1">{description}</p>
        </div>

        {/* Button */}
        {buttonname && (
          <div className="flex justify-center mt-4">
            <button className="bg-blue-500 cursor hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition duration-300">
              {buttonname}
            </button>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Card;
