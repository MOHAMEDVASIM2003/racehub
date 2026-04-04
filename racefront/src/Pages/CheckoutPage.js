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
        <div className="checkout-container">

          {/* Left - Plan Summary */}
          <div className="checkout-summary-side">
            <img src={IMAGES.bike3} alt="Raceline membership" className="checkout-image" />
            <div className="checkout-image-overlay ck-overlay">
              {plan.popular && <div className="checkout-badge popular">MOST POPULAR</div>}
              {!plan.popular && <div className="checkout-badge">MEMBERSHIP</div>}
              <h2 className="checkout-plan-title">{plan.name.toUpperCase()}</h2>
              <p className="checkout-plan-subtitle">Unlock your full racing potential with Raceline</p>

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
                <div className="ck-features-title">✨ What's Included:</div>
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
          <div className="checkout-form-side">
            <div className="checkout-form-wrapper">
              <div className="checkout-header">
                <div className="checkout-brand">
                  <span className="checkout-brand-race">RACE</span>
                  <span className="checkout-brand-line">LINE</span>
                </div>
                <h1 className="checkout-title">Complete Your Order</h1>
                <p className="checkout-subtitle">You're subscribing to the <strong>{plan.name}</strong> plan</p>
              </div>

              {/* Progress Steps */}
              <div className="checkout-steps">
                <div className="step complete">
                  <span className="step-number">1</span>
                  <span className="step-label">Account</span>
                </div>
                <div className="step-divider"></div>
                <div className="step complete">
                  <span className="step-number">2</span>
                  <span className="step-label">Payment</span>
                </div>
                <div className="step-divider"></div>
                <div className="step active">
                  <span className="step-number">3</span>
                  <span className="step-label">Review</span>
                </div>
              </div>

              {error && <div className="checkout-error">{error}</div>}

              <form onSubmit={handleSubmit} className="checkout-form">

                {/* Account Section */}
                <div className="checkout-section">
                  <div className="section-header">
                    <h3>👤 Account Details</h3>
                  </div>
                  
                  <div className="section-row">
                    <div className="form-field">
                      <label className="form-label">Full Name <span className="required">*</span></label>
                      <input 
                        type="text" 
                        name="fullName" 
                        className="form-input" 
                        placeholder="John Doe" 
                        value={form.fullName} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label">Email <span className="required">*</span></label>
                      <input 
                        type="email" 
                        name="email" 
                        className="form-input" 
                        placeholder="you@example.com" 
                        value={form.email} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Section */}
                <div className="checkout-section">
                  <div className="section-header">
                    <h3>💳 Payment Information</h3>
                  </div>

                  <div className="form-field">
                    <label className="form-label">Card Number <span className="required">*</span></label>
                    <input 
                      type="text" 
                      name="cardNumber" 
                      className="form-input" 
                      placeholder="1234 5678 9012 3456" 
                      value={form.cardNumber} 
                      onChange={handleChange} 
                      maxLength={19} 
                      required 
                    />
                  </div>

                  <div className="section-row">
                    <div className="form-field">
                      <label className="form-label">Expiry <span className="required">*</span></label>
                      <input 
                        type="text" 
                        name="expiry" 
                        className="form-input" 
                        placeholder="MM / YY" 
                        value={form.expiry} 
                        onChange={handleChange} 
                        maxLength={7} 
                        required 
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label">CVV <span className="required">*</span></label>
                      <input 
                        type="text" 
                        name="cvv" 
                        className="form-input" 
                        placeholder="123" 
                        value={form.cvv} 
                        onChange={handleChange} 
                        maxLength={4} 
                        required 
                      />
                    </div>
                  </div>
                </div>

                {/* Billing Section */}
                <div className="checkout-section">
                  <div className="section-header">
                    <h3>📍 Billing Address</h3>
                  </div>

                  <div className="form-field">
                    <label className="form-label">Street Address <span className="required">*</span></label>
                    <input 
                      type="text" 
                      name="billingAddress" 
                      className="form-input" 
                      placeholder="123 Race Street" 
                      value={form.billingAddress} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>

                  <div className="section-row three-columns">
                    <div className="form-field">
                      <label className="form-label">City <span className="required">*</span></label>
                      <input 
                        type="text" 
                        name="city" 
                        className="form-input" 
                        placeholder="City" 
                        value={form.city} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label">ZIP Code <span className="required">*</span></label>
                      <input 
                        type="text" 
                        name="zip" 
                        className="form-input" 
                        placeholder="12345" 
                        value={form.zip} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label">Country <span className="required">*</span></label>
                      <select 
                        name="country" 
                        className="form-input" 
                        value={form.country} 
                        onChange={handleChange} 
                        required
                      >
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
                </div>

                {/* Promo Code */}
                <div className="form-field">
                  <label className="form-label">Promo Code <span className="optional">(Optional)</span></label>
                  <input 
                    type="text" 
                    name="promoCode" 
                    className="form-input" 
                    placeholder="Enter promo code" 
                    value={form.promoCode} 
                    onChange={handleChange} 
                  />
                </div>

                {/* Order Summary */}
                <div className="checkout-summary">
                  <div className="summary-title">Order Summary</div>
                  <div className="summary-item">
                    <span>{plan.name} Plan</span>
                    <span className="summary-price">${plan.price}/{plan.billing}</span>
                  </div>
                  <div className="summary-item">
                    <span>Discount</span>
                    <span className="summary-discount">-$0.00</span>
                  </div>
                  <div className="summary-divider"></div>
                  <div className="summary-item total">
                    <span>Total Today</span>
                    <span>${plan.price}</span>
                  </div>
                </div>

                {/* Terms */}
                <div className="terms-box">
                  <label className="terms-checkbox">
                    <input 
                      type="checkbox" 
                      name="agreed" 
                      checked={form.agreed} 
                      onChange={handleChange} 
                    />
                    <span>
                      I agree to the <a href="#terms" className="terms-link">Subscription Terms</a>, <a href="#refund" className="terms-link">Refund Policy</a>, and <a href="#privacy" className="terms-link">Privacy Policy</a>
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="checkout-btn" 
                  disabled={loading}
                >
                  {loading ? '⏳ PROCESSING PAYMENT...' : `🔒 PAY $${plan.price} & SUBSCRIBE`}
                </button>

                <p className="checkout-secure">
                  <FontAwesomeIcon icon={faLock} style={{ marginRight: '6px' }} />
                  Your payment is secure, encrypted, and PCI compliant
                </p>
              </form>

              <p className="checkout-back">
                <Link to="/garage" className="back-link">← Back to Plans</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
