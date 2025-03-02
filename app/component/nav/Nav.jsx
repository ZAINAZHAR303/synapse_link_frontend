import React from "react";
import Link from 'next/link';

export default function Nav({ networkAnalysisRef, regulationAnalysisRef, policyAnalysisRef }) {
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-200 py-4 px-8 shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Logo */}
        <h1 className="text-4xl font-extrabold tracking-wide">NetOptimize</h1>

        {/* Right: Navigation Links */}
        <div className="flex items-center space-x-6 ml-auto">
          <Link href="/" className="hover:text-gray-300 transition-colors duration-300">
            Home
          </Link>
          {networkAnalysisRef && (
            <button
              onClick={() => scrollToSection(networkAnalysisRef)}
              className="hover:text-gray-300 transition-colors duration-300"
            >
              Network
            </button>
          )}
          {regulationAnalysisRef && (
            <button
              onClick={() => scrollToSection(regulationAnalysisRef)}
              className="hover:text-gray-300 transition-colors duration-300"
            >
              Regulation
            </button>
          )}
          {policyAnalysisRef && (
            <button
              onClick={() => scrollToSection(policyAnalysisRef)}
              className="hover:text-gray-300 transition-colors duration-300"
            >
              Policy
            </button>
          )}
          <Link href="/about" className="hover:text-gray-300 transition-colors duration-300">
            About
          </Link>
          <Link href="/history" className="hover:text-gray-300 transition-colors duration-300">
            History
          </Link>
        </div>

      </div>
    </nav>
  );
}
