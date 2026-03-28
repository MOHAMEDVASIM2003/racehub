import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: '60px' }}>
        <div className="auth-container">
          {/* Left - Event Info */}
          <div className="auth-image-side">
            <img src={event.image} alt={event.title} className="auth-image" />
            <div className="auth-image-overlay event-overlay">
              <div className="event-reg-badge">REGISTRATION OPEN</div>
              <h2 className="auth-image-title">{event.title}</h2>
              <p className="auth-image-text">{event.date} &bull; {event.location}</p>
              <div className="event-info-cards">
                <div className="event-info-card">
                  <span className="event-info-icon">&#128197;</span>
                  <div>
                    <span className="event-info-label">Date</span>
                    <span className="event-info-value">{event.date}</span>
                  </div>
                </div>
                <div className="event-info-card">
                  <span className="event-info-icon">&#128205;</span>
                  <div>
                    <span className="event-info-label">Location</span>
                    <span className="event-info-value">{event.location}</span>
                  </div>
                </div>
                <div className="event-info-card">
                  <span className="event-info-icon">&#127937;</span>
                  <div>
                    <span className="event-info-label">Type</span>
                    <span className="event-info-value">Circuit Race</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Registration Form */}
          <div className="auth-form-side event-form-side">
            <div className="auth-form-wrapper event-form-wrapper">
              <div className="auth-brand">
                <span className="auth-brand-race">RACE</span>
                <span className="auth-brand-line">LINE</span>
              </div>
              <h1 className="auth-title">Event Registration</h1>
              <p className="auth-subtitle">Fill in your details to secure your spot on the grid</p>

              {error && <div className="auth-error">{error}</div>}

              <form onSubmit={handleSubmit} className="auth-form">

                {/* Personal Info */}
                <div className="event-section-label">Personal Information</div>
                <div className="event-row">
                  <div className="auth-field">
                    <label className="auth-label">First Name</label>
                    <input type="text" name="firstName" className="auth-input" placeholder="John" value={form.firstName} onChange={handleChange} required />
                  </div>
                  <div className="auth-field">
                    <label className="auth-label">Last Name</label>
                    <input type="text" name="lastName" className="auth-input" placeholder="Doe" value={form.lastName} onChange={handleChange} required />
                  </div>
                </div>

                <div className="event-row">
                  <div className="auth-field">
                    <label className="auth-label">Email</label>
                    <input type="email" name="email" className="auth-input" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="auth-field">
                    <label className="auth-label">Phone</label>
                    <input type="tel" name="phone" className="auth-input" placeholder="+1 (555) 000-0000" value={form.phone} onChange={handleChange} required />
                  </div>
                </div>

                <div className="event-row">
                  <div className="auth-field">
                    <label className="auth-label">Date of Birth</label>
                    <input type="date" name="dob" className="auth-input" value={form.dob} onChange={handleChange} required />
                  </div>
                  <div className="auth-field">
                    <label className="auth-label">Racing License #</label>
                    <input type="text" name="licenseNumber" className="auth-input" placeholder="Optional" value={form.licenseNumber} onChange={handleChange} />
                  </div>
                </div>

                {/* Vehicle Info */}
                <div className="event-section-label">Vehicle Details</div>
                <div className="auth-field">
                  <label className="auth-label">Vehicle Type</label>
                  <select name="vehicleType" className="auth-input auth-select" value={form.vehicleType} onChange={handleChange} required>
                    <option value="" disabled>Select vehicle type</option>
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                    <option value="kart">Kart</option>
                  </select>
                </div>

                <div className="event-row">
                  <div className="auth-field">
                    <label className="auth-label">Make</label>
                    <input type="text" name="vehicleMake" className="auth-input" placeholder="e.g. Yamaha, BMW" value={form.vehicleMake} onChange={handleChange} required />
                  </div>
                  <div className="auth-field">
                    <label className="auth-label">Model</label>
                    <input type="text" name="vehicleModel" className="auth-input" placeholder="e.g. R1, M4" value={form.vehicleModel} onChange={handleChange} required />
                  </div>
                </div>

                <div className="auth-field">
                  <label className="auth-label">Racing Experience</label>
                  <select name="experience" className="auth-input auth-select" value={form.experience} onChange={handleChange} required>
                    <option value="" disabled>Select your experience level</option>
                    <option value="beginner">Beginner (0-1 years)</option>
                    <option value="intermediate">Intermediate (2-4 years)</option>
                    <option value="advanced">Advanced (5+ years)</option>
                    <option value="professional">Professional</option>
                  </select>
                </div>

                {/* Emergency Contact */}
                <div className="event-section-label">Emergency Contact</div>
                <div className="event-row">
                  <div className="auth-field">
                    <label className="auth-label">Contact Name</label>
                    <input type="text" name="emergencyName" className="auth-input" placeholder="Full name" value={form.emergencyName} onChange={handleChange} required />
                  </div>
                  <div className="auth-field">
                    <label className="auth-label">Contact Phone</label>
                    <input type="tel" name="emergencyPhone" className="auth-input" placeholder="+1 (555) 000-0000" value={form.emergencyPhone} onChange={handleChange} required />
                  </div>
                </div>

                {/* Terms */}
                <label className="auth-remember auth-terms">
                  <input type="checkbox" name="agreed" checked={form.agreed} onChange={handleChange} />
                  <span>I agree to the <a href="#waiver" className="auth-forgot">Liability Waiver</a>, <a href="#rules" className="auth-forgot">Race Rules</a>, and <a href="#terms" className="auth-forgot">Terms of Service</a></span>
                </label>

                <button type="submit" className="auth-submit-btn" disabled={loading}>
                  {loading ? 'SUBMITTING...' : 'CONFIRM REGISTRATION'}
                </button>
              </form>

              <p className="auth-switch">
                <Link to="/events" className="auth-switch-link">&larr; Back to Events</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventRegisterPage;
