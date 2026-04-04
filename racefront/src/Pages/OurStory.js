import React from 'react'
import IMAGES from '../Assets/images'
import './OurStory.css'

function OurStory() {
  return (
    <div>
      <div className="our-story-container">
        {/* Left Side - Image */}
        <div className="our-story-image-side">
          <div className="our-story-image-wrapper">
            <img src={IMAGES.raceStory} alt="RACELINE racing community" className="our-story-image" />
            <div className="our-story-image-overlay"></div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="our-story-content-side">
          <div className="our-story-content-wrapper">
            <div className="our-story-badge">📖 OUR HERITAGE</div>
            
            <h1 className="our-story-title">Our Story</h1>
            
            <div className="our-story-divider"></div>
            
            <p className="our-story-text">
              Founded by passionate racers,{" "}
              <span className="our-story-highlight">RACELINE</span> has grown into the
              world's premier racing community. We believe in the power of
              motorsport to bring people together, push boundaries, and create
              unforgettable moments.
            </p>

            <div className="our-story-highlights">
              <div className="highlight-item">
                <span className="highlight-icon">🏁</span>
                <span className="highlight-text">Passionate Community</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">⚡</span>
                <span className="highlight-text">Pushing Boundaries</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">✨</span>
                <span className="highlight-text">Unforgettable Moments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurStory