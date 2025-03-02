import React from "react";
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6">
      {/* Footer Container */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left space-y-6 md:space-y-0">
        
        {/* Brand Section */}
        <div className="md:w-1/4">
          <h2 className="text-2xl font-bold">NetOptimize AI</h2>
          <p className="text-gray-400 text-sm mt-2">
            Empowering AI solutions for network optimization and analytics.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="md:w-1/4">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="text-gray-400 space-y-2">
            <li><a href="/" className="hover:text-gray-200 transition">Home</a></li>
            <li><a href="/about" className="hover:text-gray-200 transition">About Us</a></li>
            <li><a href="/history" className="hover:text-gray-200 transition">History</a></li>
           
          </ul>
        </div>

        {/* Contact Information */}
        <div className="md:w-1/4">
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-gray-400 text-sm flex items-center justify-center md:justify-start">
            <FaEnvelope className="mr-2 text-gray-300" /> itxzubair45@gmail.com
          </p>
          <p className="text-gray-400 text-sm flex items-center justify-center md:justify-start mt-2">
            <FaPhone className="mr-2 text-gray-300" /> +923247729628
          </p>
        </div>

        {/* Social Media Section */}
        <div className="md:w-1/4">
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <nav className="flex justify-center md:justify-start space-x-4 text-xl">
            <a href="https://www.linkedin.com/in/muhammad-zubair-shehzad-b392062aa/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition">
              <FaLinkedin />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/share/15mEXgHYrw/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition">
              <FaTwitter />
            </a>
          </nav>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} NetOptimize AI. All rights reserved.
      </div>
    </footer>
  );
}
