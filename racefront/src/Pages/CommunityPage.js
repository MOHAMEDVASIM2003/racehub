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
          <h1>COMMUNITY</h1>
          <p>Connect with racers from around the world</p>
        </div>
        <Community />
        <Footer />
      </div>
    </div>
  );
}

export default CommunityPage;
