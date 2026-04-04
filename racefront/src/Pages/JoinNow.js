import React from 'react'
import { Link } from 'react-router-dom'
import './JoinNow.css'
import IMAGES from '../Assets/images'

function JoinNow() {
  return (
    <div className="join-now-section">
      {/* Left Side - Image */}
      <div className="join-now-image-side">
        <div className="join-now-image-wrapper">
          <img src={IMAGES.joinCommunity} alt="Join RACELINE Community" className="join-now-image" />
          <div className="join-now-image-overlay"></div>
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="join-now-content-side">
        <div className="join-now-content-wrapper">
          <div className="join-now-badge">🏁 GET STARTED</div>
          
          <h2 className="join-now-title">
            Join Our <span className="join-now-highlight">Racing</span> Community
          </h2>
          
          <div className="join-now-divider"></div>
          
          <p className="join-now-description">
            Connect with fellow racers, share your builds, and stay updated on the latest events.
            Our community is built by racers, for racers.
          </p>

          {/* Benefits */}
          <div className="join-now-benefits">
            <div className="benefit-item">
              <span className="benefit-icon">🚗</span>
              <span className="benefit-text">Share Your Builds</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🎯</span>
              <span className="benefit-text">Track Events</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">👥</span>
              <span className="benefit-text">Meet Racers</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">⚡</span>
              <span className="benefit-text">Stay Updated</span>
            </div>
          </div>

          <Link to="/community/join" className="join-now-btn">🔒 JOIN NOW</Link>
          
          <p className="join-now-cta">Free to join • No credit card required</p>
        </div>
      </div>
    </div>
  )
}

export default JoinNow
