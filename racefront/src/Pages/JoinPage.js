import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import JoinNow from './JoinNow';

function JoinPage() {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: '60px' }}>
        <div className="page-hero">
          <div className="hero-content">
            <h1>JOIN NOW</h1>
            <div className="hero-divider"></div>
            <p>Become part of the world's premier racing community</p>
          </div>
        </div>
        <JoinNow />
        <Footer />
      </div>
    </div>
  );
}

export default JoinPage;
