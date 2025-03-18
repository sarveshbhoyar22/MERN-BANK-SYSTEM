import React from "react";

const Branding = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <div className="max-w-4xl bg-black shadow-md rounded-lg p-8 mt-20">
        <h1 className="text-4xl font-bold text-blue-500 mb-4 text-left">
          Branding Guidelines
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          Our brand represents trust, security, and innovation. We ensure
          consistency in our visual identity across all platforms.
        </p>

        <ul className="list-disc mt-4 ml-6 text-gray-400 space-y-2">
          <li>🎨 Brand Colors & Typography</li>
          <li>📜 Logo Usage & Variations</li>
          <li>🖼️ Iconography & Imagery Guidelines</li>
          <li>📣 Brand Voice & Communication Style</li>
        </ul>
      </div>
    </div>
  );
};

export default Branding;
