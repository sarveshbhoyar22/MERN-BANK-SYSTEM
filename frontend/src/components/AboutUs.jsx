import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const AboutUs = () => {
  const navigate = useNavigate();
  const {authUser:user} = useAuthContext();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <div className="max-w-4xl bg-black shadow-md rounded-lg p-8 mt-20 ">
        <h1 className="text-4xl font-bold text-blue-500 mb-4 text-left">
          Auth-Bank
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          Welcome to <strong>Auth-Bank</strong>, your trusted digital banking
          solution. Our goal is to provide seamless and secure banking services
          with cutting-edge technology. We empower users with features like:
        </p>

        <ul className="list-disc mt-4 ml-6 text-gray-400 space-y-2">
          <li>🔐 Secure Authentication & Account Management</li>
          <li>💳 Instant Money Transfers & Payments</li>
          <li>🏦 Smart Loan Applications & Approvals</li>
          <li>📜 Detailed Transaction History & Statements</li>
          <li>⚡ 24/7 Customer Support & AI Assistance</li>
        </ul>

        <div className="mt-6 text-left">
          <h2 className="text-2xl font-semibold text-gray-300">
            Why Choose Us?
          </h2>
          <p className="text-gray-500 mt-2">
            We combine innovation with security to make banking effortless. Join
            us to experience a modern financial ecosystem designed for the
            future.
          </p>
        </div>

        {/* Blog Promotion Section */}
        <div className="mt-8 p-6 bg-gray-900 rounded-lg">
          <h2 className="text-2xl font-bold text-blue-400">
            📢 Explore Our Blog
          </h2>
          <p className="text-gray-400 mt-2">
            Stay updated with the latest financial trends, investment tips, and
            banking innovations. Read insightful blogs from experts and share
            your own thoughts by writing a blog post!
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <button
              className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              onClick={() => navigate("/blog")}
            >
              📖 Read Blogs
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-400">Need help? Contact us for support!</p>
          <button
            className="mt-3 bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-semibold py-2 px-6 rounded"
            onClick={() => navigate("/contact")}
          >
            📞 Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
