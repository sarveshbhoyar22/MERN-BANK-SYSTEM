import React from "react";

const Jobs = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <div className="max-w-4xl bg-black shadow-md rounded-lg p-8 mt-20">
        <h1 className="text-4xl font-bold text-blue-500 mb-4 text-left">
          Careers at Auth-Bank
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          Join our team and be a part of the future of banking. We value
          innovation, teamwork, and growth.
        </p>

        <ul className="list-disc mt-4 ml-6 text-gray-400 space-y-2">
          <li>💼 Open Positions & Job Roles</li>
          <li>🎓 Internship & Training Programs</li>
          <li>📌 Remote & Hybrid Work Opportunities</li>
        </ul>
      </div>
    </div>
  );
};

export default Jobs;
