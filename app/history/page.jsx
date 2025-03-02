import React from 'react';
import History from '../component/history/History';
import Nav from '../component/nav/Nav';
import Footer from '../component/footer/Footer';

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the Top */}
      <Nav />

      {/* Main Content (History) grows to fill space */}
      <div className="flex-grow">
        <History />
      </div>

      {/* Footer stays at the bottom */}
      <Footer />
    </div>
  );
}
