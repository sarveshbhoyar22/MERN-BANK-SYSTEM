import React from "react";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <div className="max-w-4xl bg-black shadow-md rounded-lg p-8 mt-20">
        <h1 className="text-4xl font-bold text-blue-500 mb-4 text-left">
          Terms of Use
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          Please read our terms before using our services.
        </p>

        <ul className="list-disc mt-4 ml-6 text-gray-400 space-y-2">
          <li>🔹 Account Registration & Security</li>
          <li>🔹 Service Usage Guidelines</li>
          <li>🔹 Legal Disclaimers & Liability</li>
        </ul>
      </div>
    </div>
  );
};

export default TermsOfUse;
