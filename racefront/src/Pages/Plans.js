import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import './Style.css'

function Plans() {
  return (
    <div>
      <center><h1 className="plan">Membership Plans</h1></center>
      <div className="pro">
        <div className="mp1">
        <p className="pro5">Starter</p>
          <div className="pros"><span className="amount">$9.99</span><span className="per">/month</span></div>
        <ul className="pro1">
          <li> <FontAwesomeIcon icon={faCheck} style={{ color: 'red' }} /> Event Registration</li>
          <li> <FontAwesomeIcon icon={faCheck} style={{ color: 'red' }} /> Basic Stats</li>
          <li> <FontAwesomeIcon icon={faCheck} style={{ color: 'red' }} /> Community Access</li>
          <li> <FontAwesomeIcon icon={faCheck} style={{ color: 'red' }} /> Monthly Newsletter</li>
        </ul>
        <Link to="/checkout/starter" className="plan-btn">CHOOSE PLAN</Link>
      </div>
      <div className="mp2">
        <p className="pro5">Pro Racer</p>
        <div className="pros"><span className="amount">$19.99</span><span className="per">/month</span></div>
        <ul className="pro1">
          <li> <FontAwesomeIcon icon={faCheck} style={{ color: 'red' }} /> Priority Registration</li>
          <li> <FontAwesomeIcon icon={faCheck} style={{ color: 'red' }} /> Advanced Stats</li>
          <li> <FontAwesomeIcon icon={faCheck} style={{ color: 'red' }} /> Pro Badge</li>
          <li> <FontAwesomeIcon icon={faCheck} style={{ color: 'red' }} /> Live Timing</li>
        </ul>
        <Link to="/checkout/pro" className="plan-btn">CHOOSE PLAN</Link>
      </div>
      <div className="mp3">
        <p className="pro5">Elite</p>
        <div className="pros"><span className="amount">$39.99</span><span className="per">/month</span></div>
        <ul className="pro1">
          <li> <FontAwesomeIcon icon={faCheck} style={{ color: 'red' }} /> VIP Registration</li>
          <li> <FontAwesomeIcon icon={faCheck} style={{ color: 'red' }} /> Full Analytics</li>
          <li> <FontAwesomeIcon icon={faCheck} style={{ color: 'red' }} /> Elite Badge</li>
          <li> <FontAwesomeIcon icon={faCheck} style={{ color: 'red' }} /> Personal Coach</li>
        </ul>
        <Link to="/checkout/elite" className="plan-btn">CHOOSE PLAN</Link>
      </div>
      </div>
    </div>
  )
}

export default Plans
