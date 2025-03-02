import React from 'react';
import Nav from '../component/nav/Nav';
import Footer from '../component/footer/Footer';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-200">
      {/* Navbar */}
      <Nav />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow px-6 py-16">
        <h2 className="text-5xl font-bold mb-12 text-gray-100">About us</h2>

        {/* Developer Cards */}
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Frontend Developer */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-xl text-center transition-transform transform hover:scale-105">
            <img
              src="assets/5.jpg"
              alt="Frontend Developer"
              className="w-56 h-56 rounded-full mx-auto border-4 border-gray-600 object-cover"
            />
            <h3 className="text-3xl font-semibold mt-6">Muhammad zubair shehzad -Frontend Developer</h3>
            <p className="text-gray-400 mt-3">Expert in creating modern UI/UX designs with React.js and Tailwind CSS.</p>
            <div className="mt-4">
              <p className="text-gray-300"><strong>Skills:</strong> React.js, Tailwind CSS, JavaScript, Next.js</p>
              <p className="text-gray-300"><strong>Tools:</strong> Figma, VS Code, GitHub</p>
            </div>
          </div>

          {/* Backend Developer */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-xl text-center transition-transform transform hover:scale-105">
            <img
              src="assets/2.jpg"
              alt="Backend Developer"
              className="w-56 h-56 rounded-full mx-auto border-4 border-gray-600 object-cover"
            />
            <h3 className="text-3xl font-semibold mt-6">Zain Azhar - Backend Developer</h3>
            <p className="text-gray-400 mt-3">Specialized in backend development, database management, and server-side logic.</p>
            <div className="mt-4">
              <p className="text-gray-300"><strong>Skills:</strong> Node.js, Express.js, MongoDB, REST APIs</p>
              <p className="text-gray-300"><strong>Tools:</strong> Postman, Docker, AWS, GitHub</p>
            </div>
          </div>

        </div>
      </div>

      {/* Footer - Sticks to Bottom */}
      <Footer />
    </div>
  );
}
