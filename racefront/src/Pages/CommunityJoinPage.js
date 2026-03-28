import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import Navbar from '../Components/Navbar';
import IMAGES from '../Assets/images';
import './Auth.css';
import './CommunityJoin.css';

function CommunityJoinPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    displayName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    vehicleType: '',
    vehicleName: '',
    experience: '',
    racingStyle: '',
    bio: '',
    instagram: '',
    agreed: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.agreed) {
      setError('Please agree to the community guidelines');
      return;
    }

    setLoading(true);
    try {
      const { agreed, ...formData } = form;
      await api.joinCommunity(formData);
      alert('Welcome to the Raceline community!');
      navigate('/community');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: '60px' }}>
        <div className="auth-container">

          {/* Left - Image + Community Info */}
          <div className="auth-image-side">
            <img src={IMAGES.car2} alt="Racing community" className="auth-image" />
            <div className="auth-image-overlay cj-overlay">
              <div className="event-reg-badge">COMMUNITY</div>
              <h2 className="auth-image-title">JOIN THE CREW</h2>
              <p className="auth-image-text">Connect with racers, share your rides, and climb the leaderboard.</p>

              {/* Member previews */}
              <div className="cj-members">
                <div className="cj-member">
                  <img src={IMAGES.profile1} alt="Member" className="cj-member-img" />
                  <div>
                    <span className="cj-member-name">Mike Drift</span>
                    <span className="cj-member-stat">8 Race Wins</span>
                  </div>
                </div>
                <div className="cj-member">
                  <img src={IMAGES.profile2} alt="Member" className="cj-member-img" />
                  <div>
                    <span className="cj-member-name">Sarah Apex</span>
                    <span className="cj-member-stat">12 Race Wins</span>
                  </div>
                </div>
                <div className="cj-member">
                  <img src={IMAGES.profile3} alt="Member" className="cj-member-img" />
                  <div>
                    <span className="cj-member-name">Jake Turbo</span>
                    <span className="cj-member-stat">5 Race Wins</span>
                  </div>
                </div>
              </div>

              <div className="cj-stats-row">
                <div className="cj-stat-box">
                  <span className="cj-stat-number">2.5K+</span>
                  <span className="cj-stat-label">Members</span>
                </div>
                <div className="cj-stat-box">
                  <span className="cj-stat-number">150+</span>
                  <span className="cj-stat-label">Events</span>
                </div>
                <div className="cj-stat-box">
                  <span className="cj-stat-number">30+</span>
                  <span className="cj-stat-label">Cities</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="auth-form-side event-form-side">
            <div className="auth-form-wrapper event-form-wrapper">
              <div className="auth-brand">
                <span className="auth-brand-race">RACE</span>
                <span className="auth-brand-line">LINE</span>
              </div>
              <h1 className="auth-title">Set Up Your Profile</h1>
              <p className="auth-subtitle">Create your racer identity and join the community</p>

              {error && <div className="auth-error">{error}</div>}

              <form onSubmit={handleSubmit} className="auth-form">

                {/* Basic Info */}
                <div className="event-section-label">Your Identity</div>

                <div className="auth-field">
                  <label className="auth-label">Display Name</label>
                  <input type="text" name="displayName" className="auth-input" placeholder="Your racer name" value={form.displayName} onChange={handleChange} required />
                </div>

                <div className="event-row">
                  <div className="auth-field">
                    <label className="auth-label">Email</label>
                    <input type="email" name="email" className="auth-input" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="auth-field">
                    <label className="auth-label">Phone</label>
                    <input type="tel" name="phone" className="auth-input" placeholder="+1 (555) 000-0000" value={form.phone} onChange={handleChange} />
                  </div>
                </div>

                <div className="event-row">
                  <div className="auth-field">
                    <label className="auth-label">City</label>
                    <input type="text" name="city" className="auth-input" placeholder="Your city" value={form.city} onChange={handleChange} required />
                  </div>
                  <div className="auth-field">
                    <label className="auth-label">Country</label>
                    <input type="text" name="country" className="auth-input" placeholder="Your country" value={form.country} onChange={handleChange} required />
                  </div>
                </div>

                {/* Racing Info */}
                <div className="event-section-label">Racing Profile</div>

                <div className="event-row">
                  <div className="auth-field">
                    <label className="auth-label">Vehicle Type</label>
                    <select name="vehicleType" className="auth-input auth-select" value={form.vehicleType} onChange={handleChange} required>
                      <option value="" disabled>Select type</option>
                      <option value="car">Car</option>
                      <option value="bike">Bike</option>
                      <option value="kart">Kart</option>
                      <option value="both">Car & Bike</option>
                    </select>
                  </div>
                  <div className="auth-field">
                    <label className="auth-label">Vehicle Name</label>
                    <input type="text" name="vehicleName" className="auth-input" placeholder="e.g. Yamaha R1" value={form.vehicleName} onChange={handleChange} />
                  </div>
                </div>

                <div className="event-row">
                  <div className="auth-field">
                    <label className="auth-label">Experience</label>
                    <select name="experience" className="auth-input auth-select" value={form.experience} onChange={handleChange} required>
                      <option value="" disabled>Select level</option>
                      <option value="newcomer">Newcomer</option>
                      <option value="amateur">Amateur (1-2 years)</option>
                      <option value="intermediate">Intermediate (3-5 years)</option>
                      <option value="pro">Pro (5+ years)</option>
                    </select>
                  </div>
                  <div className="auth-field">
                    <label className="auth-label">Racing Style</label>
                    <select name="racingStyle" className="auth-input auth-select" value={form.racingStyle} onChange={handleChange}>
                      <option value="" disabled>Select style</option>
                      <option value="circuit">Circuit Racing</option>
                      <option value="drag">Drag Racing</option>
                      <option value="drift">Drifting</option>
                      <option value="rally">Rally</option>
                      <option value="street">Street Meets</option>
                    </select>
                  </div>
                </div>

                {/* Social & Bio */}
                <div className="event-section-label">About You</div>

                <div className="auth-field">
                  <label className="auth-label">Short Bio</label>
                  <textarea name="bio" className="auth-input cj-textarea" placeholder="Tell the community about yourself..." value={form.bio} onChange={handleChange} rows="3"></textarea>
                </div>

                <div className="auth-field">
                  <label className="auth-label">Instagram Handle</label>
                  <input type="text" name="instagram" className="auth-input" placeholder="@yourhandle" value={form.instagram} onChange={handleChange} />
                </div>

                {/* Terms */}
                <label className="auth-remember auth-terms">
                  <input type="checkbox" name="agreed" checked={form.agreed} onChange={handleChange} />
                  <span>I agree to the <a href="#guidelines" className="auth-forgot">Community Guidelines</a> and <a href="#terms" className="auth-forgot">Code of Conduct</a></span>
                </label>

                <button type="submit" className="auth-submit-btn" disabled={loading}>
                  {loading ? 'JOINING...' : 'JOIN THE COMMUNITY'}
                </button>
              </form>

              <p className="auth-switch">
                <Link to="/community" className="auth-switch-link">&larr; Back to Community</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityJoinPage;
