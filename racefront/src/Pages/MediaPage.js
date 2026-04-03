import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Gallery from './Gallery';

function MediaPage() {
  return (
    <div className="media-page">
      <Navbar />
      <div style={{ paddingTop: '60px' }}>
        <div className="page-hero">
          <div className="hero-content">
            <h1>MEDIA GALLERY</h1>
            <div className="hero-divider"></div>
            <p>Explore racing moments and memories</p>
          </div>
        </div>
        
        <Gallery />
        <Footer />
      </div>
    </div>
  );
}

export default MediaPage;
