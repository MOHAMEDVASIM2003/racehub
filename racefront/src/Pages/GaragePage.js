import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Plans from './Plans';

function GaragePage() {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: '60px' }}>
        <div className="page-hero">
          <h1>GARAGE</h1>
          <p>Choose your membership and unlock exclusive racing perks</p>
        </div>
        <Plans />
        <Footer />
      </div>
    </div>
  );
}

export default GaragePage;
