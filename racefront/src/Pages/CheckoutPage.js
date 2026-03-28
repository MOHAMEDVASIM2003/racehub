import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faShieldAlt, faLock } from '@fortawesome/free-solid-svg-icons';
import { api } from '../api';
import Navbar from '../Components/Navbar';
import IMAGES from '../Assets/images';
import './Auth.css';
import './EventRegister.css';
import './Checkout.css';

const plansData = {
  starter: {
    name: 'Starter',
    price: '9.99',
    billing: 'month',
    features: ['Event Registration', 'Basic Stats', 'Community Access', 'Monthly Newsletter'],
  },
  pro: {
    name: 'Pro Racer',
    price: '19.99',
    billing: 'month',
    popular: true,
    features: ['Priority Registration', 'Advanced Stats', 'Pro Badge', 'Live Timing', 'Garage Showcase', 'Event Replays'],
  },
  elite: {
    name: 'Elite',
    price: '39.99',
    billing: 'month',
    features: ['VIP Registration', 'Full Analytics', 'Elite Badge', 'Live Timing', 'Garage Showcase', 'Event Replays', 'Personal Coach', '1-on-1 Support'],
  },
};

function CheckoutPage() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const plan = plansData[planId] || plansData.pro;

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    billingAddress: '',
    city: '',
    zip: '',
    country: '',
    promoCode: '',
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
      setError('Please agree to the terms');
      return;
    }

    setLoading(true);
    try {
      const { agreed, ...formData } = form;
      const data = await api.subscribe({ planId, ...formData });
      alert(data.message);
      navigate('/');
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

          {/* Left - Plan Summary */}
          <div className="auth-image-side">
            <img src={IMAGES.bike3} alt="Raceline membership" className="auth-image" />
            <div className="auth-image-overlay ck-overlay">
              {plan.popular && <div className="event-reg-badge">MOST POPULAR</div>}
              {!plan.popular && <div className="event-reg-badge">MEMBERSHIP</div>}
              <h2 className="auth-image-title">{plan.name.toUpperCase()}</h2>
              <p className="auth-image-text">Unlock your full racing potential with Raceline</p>

              {/* Price card */}
              <div className="ck-price-card">
                <div className="ck-price-row">
                  <span className="ck-price">${plan.price}</span>
                  <span className="ck-price-period">/{plan.billing}</span>
                </div>
                <div className="ck-price-note">Cancel anytime. No hidden fees.</div>
              </div>

              {/* Features */}
              <div className="ck-features">
                <div className="ck-features-title">What's included:</div>
                {plan.features.map((feature, i) => (
                  <div key={i} className="ck-feature-item">
                    <FontAwesomeIcon icon={faCheck} className="ck-feature-icon" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="ck-trust-row">
                <div className="ck-trust-item">
                  <FontAwesomeIcon icon={faShieldAlt} className="ck-trust-icon" />
                  <span>Secure Payment</span>
                </div>
                <div className="ck-trust-item">
                  <FontAwesomeIcon icon={faLock} className="ck-trust-icon" />
                  <span>SSL Encrypted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Payment Form */}
          <div className="auth-form-side event-form-side">
            <div className="auth-form-wrapper event-form-wrapper">
              <div className="auth-brand">
                <span className="auth-brand-race">RACE</span>
                <span className="auth-brand-line">LINE</span>
              </div>
              <h1 className="auth-title">Complete Your Order</h1>
              <p className="auth-subtitle">You're subscribing to the <strong style={{ color: '#E10600' }}>{plan.name}</strong> plan</p>

              {error && <div className="auth-error">{error}</div>}

              <form onSubmit={handleSubmit} className="auth-form">

                {/* Account */}
                <div className="event-section-label">Account Details</div>

                <div className="event-row">
                  <div className="auth-field">
                    <label className="auth-label">Full Name</label>
                    <input type="text" name="fullName" className="auth-input" placeholder="John Doe" value={form.fullName} onChange={handleChange} required />
                  </div>
                  <div className="auth-field">
                    <label className="auth-label">Email</label>
                    <input type="email" name="email" className="auth-input" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                  </div>
                </div>

                {/* Payment */}
                <div className="event-section-label">Payment Information</div>

                <div className="auth-field">
                  <label className="auth-label">Card Number</label>
                  <input type="text" name="cardNumber" className="auth-input" placeholder="1234 5678 9012 3456" value={form.cardNumber} onChange={handleChange} maxLength={19} required />
                </div>

                <div className="ck-card-row">
                  <div className="auth-field">
                    <label className="auth-label">Expiry Date</label>
                    <input type="text" name="expiry" className="auth-input" placeholder="MM / YY" value={form.expiry} onChange={handleChange} maxLength={7} required />
                  </div>
                  <div className="auth-field">
                    <label className="auth-label">CVV</label>
                    <input type="text" name="cvv" className="auth-input" placeholder="123" value={form.cvv} onChange={handleChange} maxLength={4} required />
                  </div>
                </div>

                {/* Billing Address */}
                <div className="event-section-label">Billing Address</div>

                <div className="auth-field">
                  <label className="auth-label">Street Address</label>
                  <input type="text" name="billingAddress" className="auth-input" placeholder="123 Race Street" value={form.billingAddress} onChange={handleChange} required />
                </div>

                <div className="ck-address-row">
                  <div className="auth-field">
                    <label className="auth-label">City</label>
                    <input type="text" name="city" className="auth-input" placeholder="City" value={form.city} onChange={handleChange} required />
                  </div>
                  <div className="auth-field">
                    <label className="auth-label">ZIP Code</label>
                    <input type="text" name="zip" className="auth-input" placeholder="12345" value={form.zip} onChange={handleChange} required />
                  </div>
                  <div className="auth-field">
                    <label className="auth-label">Country</label>
                    <select name="country" className="auth-input auth-select" value={form.country} onChange={handleChange} required>
                      <option value="" disabled>Select</option>
                      <option value="us">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="ca">Canada</option>
                      <option value="au">Australia</option>
                      <option value="de">Germany</option>
                      <option value="in">India</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="auth-field">
                  <label className="auth-label">Promo Code (Optional)</label>
                  <input type="text" name="promoCode" className="auth-input" placeholder="Enter promo code" value={form.promoCode} onChange={handleChange} />
                </div>

                {/* Order Summary */}
                <div className="ck-summary">
                  <div className="ck-summary-row">
                    <span>{plan.name} Plan</span>
                    <span>${plan.price}/{plan.billing}</span>
                  </div>
                  <div className="ck-summary-row">
                    <span>Discount</span>
                    <span className="ck-discount">-$0.00</span>
                  </div>
                  <div className="ck-summary-divider"></div>
                  <div className="ck-summary-row ck-summary-total">
                    <span>Total Today</span>
                    <span>${plan.price}</span>
                  </div>
                </div>

                {/* Terms */}
                <label className="auth-remember auth-terms">
                  <input type="checkbox" name="agreed" checked={form.agreed} onChange={handleChange} />
                  <span>I agree to the <a href="#terms" className="auth-forgot">Subscription Terms</a>, <a href="#refund" className="auth-forgot">Refund Policy</a>, and <a href="#privacy" className="auth-forgot">Privacy Policy</a></span>
                </label>

                <button type="submit" className="auth-submit-btn" disabled={loading}>
                  {loading ? 'PROCESSING...' : `PAY $${plan.price} & SUBSCRIBE`}
                </button>

                <p className="ck-secure-note">
                  <FontAwesomeIcon icon={faLock} style={{ marginRight: '6px' }} />
                  Your payment is secure and encrypted
                </p>
              </form>

              <p className="auth-switch">
                <Link to="/garage" className="auth-switch-link">&larr; Back to Plans</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
