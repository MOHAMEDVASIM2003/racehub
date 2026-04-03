import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import FeaturedEvents from './FeaturedEvents';

function EventsPage() {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: '60px' }}>
        <div className="page-hero">
          <div className="hero-content">
            <h1>RACING EVENTS</h1>
            <div className="hero-divider"></div>
            <p>Find and join the best racing events</p>
          </div>
        </div>
        <FeaturedEvents />
        <Footer />
      </div>
    </div>
  );
}

export default EventsPage;
