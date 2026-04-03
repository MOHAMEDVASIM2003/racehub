import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Community from './Community';

function CommunityPage() {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: '60px' }}>
        <div className="page-hero">
          <div className="hero-content">
            <h1>OUR COMMUNITY</h1>
            <div className="hero-divider"></div>
            <p>Connect with racers around the world</p>
          </div>
        </div>
        <Community />
        <Footer />
      </div>
    </div>
  );
}

export default CommunityPage;
