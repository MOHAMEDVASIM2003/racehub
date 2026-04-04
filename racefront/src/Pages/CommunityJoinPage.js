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

  const formSections = [
    { id: 'identity', label: 'Identity', icon: '👤' },
    { id: 'racing', label: 'Racing', icon: '🏎️' },
    { id: 'about', label: 'About', icon: '💬' },
  ];

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: '60px' }}>
        <div className="community-join-container">

          {/* Left - Image + Community Info */}
          <div className="community-join-image-side">
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
          <div className="community-join-form-side">
            <div className="community-join-form-wrapper">
              <div className="join-form-header">
                <div className="form-brand-section">
                  <span className="form-brand-race">RACE</span>
                  <span className="form-brand-line">LINE</span>
                </div>
                <h1 className="join-form-title">Set Up Your Profile</h1>
                <p className="join-form-subtitle">Create your racer identity and join the community</p>
              </div>

              {/* Progress Steps */}
              <div className="join-progress-steps">
                {formSections.map((section, index) => (
                  <React.Fragment key={section.id}>
                    <div className={`progress-step ${index === 0 ? 'active' : ''}`}>
                      <span className="step-number">{index + 1}</span>
                      <span className="step-label">{section.label}</span>
                    </div>
                    {index < formSections.length - 1 && <div className="progress-divider"></div>}
                  </React.Fragment>
                ))}
              </div>

              {error && <div className="join-form-error">{error}</div>}

              <form onSubmit={handleSubmit} className="community-join-form">

                {/* Identity Section */}
                <div className="join-form-section">
                  <div className="section-header-line">
                    <span className="section-icon">👤</span>
                    <h3>Your Identity</h3>
                  </div>
                  
                  <div className="join-field">
                    <label className="join-label">Display Name <span className="required">*</span></label>
                    <input 
                      type="text" 
                      name="displayName" 
                      className="join-input" 
                      placeholder="Your racer name" 
                      value={form.displayName} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>

                  <div className="join-row">
                    <div className="join-field">
                      <label className="join-label">Email <span className="required">*</span></label>
                      <input 
                        type="email" 
                        name="email" 
                        className="join-input" 
                        placeholder="you@example.com" 
                        value={form.email} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="join-field">
                      <label className="join-label">Phone <span className="required-opt">✓</span></label>
                      <input 
                        type="tel" 
                        name="phone" 
                        className="join-input" 
                        placeholder="+1 (555) 000-0000" 
                        value={form.phone} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>

                  <div className="join-row">
                    <div className="join-field">
                      <label className="join-label">City <span className="required">*</span></label>
                      <input 
                        type="text" 
                        name="city" 
                        className="join-input" 
                        placeholder="Your city" 
                        value={form.city} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="join-field">
                      <label className="join-label">Country <span className="required">*</span></label>
                      <input 
                        type="text" 
                        name="country" 
                        className="join-input" 
                        placeholder="Your country" 
                        value={form.country} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>
                </div>

                {/* Racing Section */}
                <div className="join-form-section">
                  <div className="section-header-line">
                    <span className="section-icon">🏎️</span>
                    <h3>Racing Profile</h3>
                  </div>

                  <div className="join-row">
                    <div className="join-field">
                      <label className="join-label">Vehicle Type <span className="required">*</span></label>
                      <select 
                        name="vehicleType" 
                        className="join-input join-select" 
                        value={form.vehicleType} 
                        onChange={handleChange} 
                        required
                      >
                        <option value="" disabled>Select type</option>
                        <option value="car">Car</option>
                        <option value="bike">Bike</option>
                        <option value="kart">Kart</option>
                        <option value="both">Car & Bike</option>
                      </select>
                    </div>
                    <div className="join-field">
                      <label className="join-label">Vehicle Name</label>
                      <input 
                        type="text" 
                        name="vehicleName" 
                        className="join-input" 
                        placeholder="e.g. Yamaha R1" 
                        value={form.vehicleName} 
                        onChange={handleChange} 
                      />
                    </div>
                  </div>

                  <div className="join-row">
                    <div className="join-field">
                      <label className="join-label">Experience Level <span className="required">*</span></label>
                      <select 
                        name="experience" 
                        className="join-input join-select" 
                        value={form.experience} 
                        onChange={handleChange} 
                        required
                      >
                        <option value="" disabled>Select level</option>
                        <option value="newcomer">Newcomer</option>
                        <option value="amateur">Amateur (1-2 years)</option>
                        <option value="intermediate">Intermediate (3-5 years)</option>
                        <option value="pro">Pro (5+ years)</option>
                      </select>
                    </div>
                    <div className="join-field">
                      <label className="join-label">Racing Style</label>
                      <select 
                        name="racingStyle" 
                        className="join-input join-select" 
                        value={form.racingStyle} 
                        onChange={handleChange}
                      >
                        <option value="" disabled>Select style</option>
                        <option value="circuit">Circuit Racing</option>
                        <option value="drag">Drag Racing</option>
                        <option value="drift">Drifting</option>
                        <option value="rally">Rally</option>
                        <option value="street">Street Meets</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* About Section */}
                <div className="join-form-section">
                  <div className="section-header-line">
                    <span className="section-icon">💬</span>
                    <h3>About You</h3>
                  </div>

                  <div className="join-field">
                    <label className="join-label">Short Bio</label>
                    <textarea 
                      name="bio" 
                      className="join-input join-textarea" 
                      placeholder="Tell the community about yourself..." 
                      value={form.bio} 
                      onChange={handleChange} 
                      rows="4"
                    ></textarea>
                  </div>

                  <div className="join-field">
                    <label className="join-label">Instagram Handle</label>
                    <input 
                      type="text" 
                      name="instagram" 
                      className="join-input" 
                      placeholder="@yourhandle" 
                      value={form.instagram} 
                      onChange={handleChange} 
                    />
                  </div>
                </div>

                {/* Terms Section */}
                <div className="join-terms-section">
                  <label className="join-terms-checkbox">
                    <input 
                      type="checkbox" 
                      name="agreed" 
                      checked={form.agreed} 
                      onChange={handleChange} 
                    />
                    <span>
                      I agree to the <a href="#guidelines" className="join-terms-link">Community Guidelines</a> and <a href="#terms" className="join-terms-link">Code of Conduct</a>
                    </span>
                  </label>
                  {!form.agreed && <p className="terms-warning">Please agree to continue</p>}
                </div>

                {/* Submit Section */}
                <div className="join-form-actions">
                  <button 
                    type="submit" 
                    className="join-submit-btn" 
                    disabled={loading}
                  >
                    {loading ? '⏳ JOINING...' : '✨ JOIN THE COMMUNITY'}
                  </button>
                  <Link to="/community" className="join-back-link">
                    ← Back to Community
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityJoinPage;
