import React from 'react';

export default function Hero() {
  return (
    <div className="relative max-w-7xl h-screen"> {/* Set container to full screen */}
      <img
        src="/assets/4.jpg"
        alt="image"
        className="absolute inset-0 w-full h-full object-cover" // Cover the whole div
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <p className="text-4xl font-bold text-white bg-black bg-opacity-50 p-4 rounded-lg">
          Welcome to Our Net Optimization AI
        </p>
      </div>
    </div>
  );
}