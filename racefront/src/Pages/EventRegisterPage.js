import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faMapMarkerAlt, faTrophy, faUser, faCar, faPhone, faShieldAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { api } from '../api';
import Navbar from '../Components/Navbar';
import IMAGES from '../Assets/images';
import './Auth.css';
import './EventRegister.css';

const eventsData = {
  1:  { title: 'Summer Sprint Series',    date: 'Mar 15, 2024', location: 'Laguna Seca',  image: IMAGES.event1 },
  2:  { title: 'Night Drift Championship', date: 'Apr 02, 2024', location: 'Suzuka Circuit', image: IMAGES.event2 },
  3:  { title: 'Endurance Cup 500',        date: 'Apr 20, 2024', location: 'Silverstone',  image: IMAGES.event3 },
  4:  { title: 'Street Rally Pro',         date: 'May 05, 2024', location: 'Monaco',       image: IMAGES.event4 },
  5:  { title: 'GT Masters Open',          date: 'May 18, 2024', location: 'Nurburgring',  image: IMAGES.event5 },
  6:  { title: 'Thunder Lap Challenge',    date: 'Jun 01, 2024', location: 'Brands Hatch', image: IMAGES.event6 },
  7:  { title: 'Desert Storm Rally',       date: 'Jun 15, 2024', location: 'Dakar Route',  image: IMAGES.event7 },
  8:  { title: 'Supercar Showdown',        date: 'Jul 04, 2024', location: 'Monza',        image: IMAGES.event8 },
  9:  { title: 'Midnight Drag Wars',       date: 'Jul 20, 2024', location: 'Santa Pod',    image: IMAGES.event9 },
  10: { title: 'Classic Le Mans Revival',  date: 'Aug 08, 2024', location: 'Le Mans',      image: IMAGES.event10 },
  11: { title: 'Turbo Kart Grand Prix',    date: 'Aug 25, 2024', location: 'Spa',          image: IMAGES.event11 },
  12: { title: 'Season Finale Blitz',      date: 'Sep 10, 2024', location: 'Imola',        image: IMAGES.event12 },
};

function EventRegisterPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = eventsData[eventId] || eventsData[1];
  const [activeSection, setActiveSection] = useState('personal');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    licenseNumber: '',
    vehicleType: '',
    vehicleMake: '',
    vehicleModel: '',
    experience: '',
    emergencyName: '',
    emergencyPhone: '',
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
      setError('Please agree to the terms and conditions');
      return;
    }

    setLoading(true);
    try {
      const { agreed, ...formData } = form;
      await api.registerEvent(eventId, formData);
      alert('Registration submitted successfully!');
      navigate('/events');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    { id: 'personal', label: 'Personal', icon: faUser },
    { id: 'vehicle', label: 'Vehicle', icon: faCar },
    { id: 'emergency', label: 'Emergency', icon: faPhone },
    { id: 'terms', label: 'Terms', icon: faShieldAlt }
  ];

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: '60px' }}>
        <div className="event-register-container">
          {/* Left Side - Event Summary */}
          <div className="event-register-sidebar">
            <div className="event-image-container">
              <img src={event.image} alt={event.title} className="event-register-image" />
              <div className="event-register-overlay">
                <div className="event-register-badge">REGISTRATION</div>
              </div>
            </div>

            <div className="event-summary-card">
              <h2 className="event-summary-title">{event.title}</h2>
              
              <div className="event-details-list">
                <div className="event-detail-item">
                  <FontAwesomeIcon icon={faCalendar} className="detail-icon" />
                  <div>
                    <span className="detail-label">Date</span>
                    <span className="detail-value">{event.date}</span>
                  </div>
                </div>
                
                <div className="event-detail-item">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="detail-icon" />
                  <div>
                    <span className="detail-label">Location</span>
                    <span className="detail-value">{event.location}</span>
                  </div>
                </div>

                <div className="event-detail-item">
                  <FontAwesomeIcon icon={faTrophy} className="detail-icon" />
                  <div>
                    <span className="detail-label">Event Type</span>
                    <span className="detail-value">Circuit Race</span>
                  </div>
                </div>
              </div>

              <div className="event-benefits">
                <h4 className="benefits-title">What You Get</h4>
                <ul className="benefits-list">
                  <li><FontAwesomeIcon icon={faCheckCircle} /> Race Number & Badge</li>
                  <li><FontAwesomeIcon icon={faCheckCircle} /> Live Timing & Leaderboard</li>
                  <li><FontAwesomeIcon icon={faCheckCircle} /> Safety Briefing & Support</li>
                  <li><FontAwesomeIcon icon={faCheckCircle} /> Post-Event Certificate</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="event-register-form-container">
            <div className="form-header">
              <div className="form-branding">
                <span className="form-brand-race">RACE</span>
                <span className="form-brand-line">LINE</span>
              </div>
              <h1 className="form-title">Event Registration</h1>
              <p className="form-subtitle">Complete your profile to secure your spot</p>
            </div>

            {error && <div className="form-error-banner">{error}</div>}

            {/* Section Tabs */}
            <div className="form-section-tabs">
              {sections.map((section) => (
                <button
                  key={section.id}
                  className={`section-tab ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <FontAwesomeIcon icon={section.icon} />
                  <span className="section-tab-label">{section.label}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="event-register-form">
              {/* Personal Information */}
              {activeSection === 'personal' && (
                <div className="form-section active">
                  <div className="section-header">
                    <FontAwesomeIcon icon={faUser} className="section-icon" />
                    <h3>Personal Information</h3>
                  </div>

                  <div className="form-group-row">
                    <div className="form-group">
                      <label className="form-label">First Name <span className="required">*</span></label>
                      <input type="text" name="firstName" className="form-input" placeholder="John" value={form.firstName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name <span className="required">*</span></label>
                      <input type="text" name="lastName" className="form-input" placeholder="Doe" value={form.lastName} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="form-group-row">
                    <div className="form-group">
                      <label className="form-label">Email <span className="required">*</span></label>
                      <input type="email" name="email" className="form-input" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone <span className="required">*</span></label>
                      <input type="tel" name="phone" className="form-input" placeholder="+1 (555) 000-0000" value={form.phone} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="form-group-row">
                    <div className="form-group">
                      <label className="form-label">Date of Birth <span className="required">*</span></label>
                      <input type="date" name="dob" className="form-input" value={form.dob} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Racing License #</label>
                      <input type="text" name="licenseNumber" className="form-input" placeholder="Optional" value={form.licenseNumber} onChange={handleChange} />
                    </div>
                  </div>
                </div>
              )}

              {/* Vehicle Details */}
              {activeSection === 'vehicle' && (
                <div className="form-section active">
                  <div className="section-header">
                    <FontAwesomeIcon icon={faCar} className="section-icon" />
                    <h3>Vehicle Details</h3>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Vehicle Type <span className="required">*</span></label>
                    <select name="vehicleType" className="form-input form-select" value={form.vehicleType} onChange={handleChange} required>
                      <option value="" disabled>Select vehicle type</option>
                      <option value="car">Car</option>
                      <option value="bike">Bike</option>
                      <option value="kart">Kart</option>
                    </select>
                  </div>

                  <div className="form-group-row">
                    <div className="form-group">
                      <label className="form-label">Make <span className="required">*</span></label>
                      <input type="text" name="vehicleMake" className="form-input" placeholder="e.g. Yamaha, BMW" value={form.vehicleMake} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Model <span className="required">*</span></label>
                      <input type="text" name="vehicleModel" className="form-input" placeholder="e.g. R1, M4" value={form.vehicleModel} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Racing Experience <span className="required">*</span></label>
                    <select name="experience" className="form-input form-select" value={form.experience} onChange={handleChange} required>
                      <option value="" disabled>Select your experience level</option>
                      <option value="beginner">Beginner (0-1 years)</option>
                      <option value="intermediate">Intermediate (2-4 years)</option>
                      <option value="advanced">Advanced (5+ years)</option>
                      <option value="professional">Professional</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Emergency Contact */}
              {activeSection === 'emergency' && (
                <div className="form-section active">
                  <div className="section-header">
                    <FontAwesomeIcon icon={faPhone} className="section-icon" />
                    <h3>Emergency Contact</h3>
                  </div>

                  <div className="form-group-row">
                    <div className="form-group">
                      <label className="form-label">Contact Name <span className="required">*</span></label>
                      <input type="text" name="emergencyName" className="form-input" placeholder="Full name" value={form.emergencyName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Contact Phone <span className="required">*</span></label>
                      <input type="tel" name="emergencyPhone" className="form-input" placeholder="+1 (555) 000-0000" value={form.emergencyPhone} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="emergency-note">
                    <FontAwesomeIcon icon={faShieldAlt} className="note-icon" />
                    <p>This person will be contacted in case of any emergency during the event.</p>
                  </div>
                </div>
              )}

              {/* Terms & Conditions */}
              {activeSection === 'terms' && (
                <div className="form-section active">
                  <div className="section-header">
                    <FontAwesomeIcon icon={faShieldAlt} className="section-icon" />
                    <h3>Legal & Safety</h3>
                  </div>

                  <div className="terms-box">
                    <label className="terms-checkbox">
                      <input type="checkbox" name="agreed" checked={form.agreed} onChange={handleChange} />
                      <span>I agree to the <a href="#waiver" className="terms-link">Liability Waiver</a>, <a href="#rules" className="terms-link">Race Rules</a>, and <a href="#terms" className="terms-link">Terms of Service</a></span>
                    </label>
                    <p className="terms-description">By registering, you acknowledge that you have read and understood all safety requirements and race rules.</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="form-actions">
                <Link to="/events" className="btn-secondary">← Back to Events</Link>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'CONFIRMING...' : 'CONFIRM REGISTRATION'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventRegisterPage;
