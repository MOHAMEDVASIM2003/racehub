import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Gallery from './Gallery';

function MediaPage() {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: '60px' }}>
        <div className="page-hero">
          <h1>MEDIA</h1>
          <p>Relive the most thrilling moments on the track</p>
        </div>
        <Gallery />
        <Footer />
      </div>
    </div>
  );
}

export default MediaPage;
