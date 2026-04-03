import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Gallery from './Gallery';

function MediaPage() {
  return (
    <div className="media-page">
      <Navbar />
      <div style={{ paddingTop: '60px' }}>
        <div className="media-page-hero">
          <div className="hero-background"></div>
          <div className="hero-content">
            <h1 className="hero-title">MEDIA & GALLERY</h1>
            <p className="hero-description">Relive the most thrilling moments on the track</p>
            <div className="hero-divider"></div>
          </div>
        </div>
        
        <Gallery />
        <Footer />
      </div>
    </div>
  );
}

export default MediaPage;
