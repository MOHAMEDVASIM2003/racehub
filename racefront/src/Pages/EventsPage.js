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
          <h1>EVENTS</h1>
          <p>Find and register for the latest racing events near you</p>
        </div>
        <FeaturedEvents />
        <Footer />
      </div>
    </div>
  );
}

export default EventsPage;
