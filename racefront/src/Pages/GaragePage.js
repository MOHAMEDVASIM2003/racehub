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
          <div className="hero-content">
            <h1>MEMBERSHIP PLANS</h1>
            <div className="hero-divider"></div>
            <p>Choose your plan and start racing</p>
          </div>
        </div>
        <Plans />
        <Footer />
      </div>
    </div>
  );
}

export default GaragePage;
