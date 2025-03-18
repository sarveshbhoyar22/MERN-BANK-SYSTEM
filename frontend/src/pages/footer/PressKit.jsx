import React from "react";

const PressKit = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <div className="max-w-4xl bg-black shadow-md rounded-lg p-8 mt-20">
        <h1 className="text-4xl font-bold text-blue-500 mb-4 text-left">
          Press Kit
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          Download our official media assets and press releases.
        </p>

        <ul className="list-disc mt-4 ml-6 text-gray-400 space-y-2">
          <li>📄 Company Overview & Factsheet</li>
          <li>📷 Logos, Banners & Brand Assets</li>
          <li>📰 Recent News & Press Releases</li>
        </ul>
      </div>
    </div>
  );
};

export default PressKit;
