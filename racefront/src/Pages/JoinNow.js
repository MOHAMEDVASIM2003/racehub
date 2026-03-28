import React from 'react'
import { Link } from 'react-router-dom'
import './Style.css'
import IMAGES from '../Assets/images'
function JoinNow() {
  return (
    <div className="overall">
      <div className="jimg">
        <img src={IMAGES.joinCommunity} className="join-img" alt="join"/>
      </div>
      <div className="jn">
        <h2 className="f1">Join Our <span className="red">Racing</span><br/> Community</h2>
        <p className="f2">Connect with fellow races<br />share your builds,and stay<br />updated on the latest events.<br />our community is build by<br />racers,for racers.</p>
        <Link to="/community/join" className="jbtn">JOIN NOW</Link>
      </div>
    </div>
  )
}

export default JoinNow
