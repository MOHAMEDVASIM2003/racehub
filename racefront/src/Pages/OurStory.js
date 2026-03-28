import React from 'react'
import IMAGES from '../Assets/images'

function OurStory() {
  return (
    <div className="community">
      <div className="community-text">
        <img src={IMAGES.raceStory} alt="race cars"></img>
      </div>
      <div className="community-text2">
        <h1 className="Ourstory">Our Story</h1>
        <p className="para">
          Founded by passionate racers,{" "}
          <spam className="raceline-txt">RACELINE</spam> has grown into the
          world's premier racing community. We believe in the power of
          motorsport to bring people together, push boundaries, and create
          unforgettable moments.
        </p>
      </div>
    </div>
  )
}

export default OurStory