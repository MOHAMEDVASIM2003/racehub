import React, { useState } from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { api } from '../api';
import '../Pages/Style.css';

function Footer() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      const data = await api.subscribeNewsletter(email);
      setMsg(data.message);
      setEmail('');
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="footer-wrapper">
      <div className="footer-top">

        <div className="footer-col footer-brand">
          <h2 className="footer-logo">RACE<span className="footer-logo-accent">LINE</span></h2>
          <p className="footer-desc">
            The ultimate destination for racing enthusiasts and professionals worldwide.
          </p>
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaXTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li>Events</li>
            <li>Community</li>
            <li>Garage</li>
            <li>About</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Support</h4>
          <ul className="footer-links">
            <li>Help Center</li>
            <li>Safety</li>
            <li>Terms</li>
            <li>Privacy</li>
          </ul>
        </div>

        <div className="footer-col footer-newsletter">
          <h4 className="footer-heading">Newsletter</h4>
          <p className="footer-newsletter-text">
            Stay updated with the latest racing news and events.
          </p>
          <form onSubmit={handleNewsletter} className="footer-input-row">
            <input
              className="footer-input"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="footer-join-btn">JOIN</button>
          </form>
          {msg && <p style={{ color: '#ccc', fontSize: '12px', marginTop: '6px' }}>{msg}</p>}
        </div>

      </div>

      <div className="footer-bottom">
        <span>&copy; 2025 RACELINE. All rights reserved.</span>
      </div>
    </div>
  );
}

export default Footer;
