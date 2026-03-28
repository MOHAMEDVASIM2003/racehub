import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Navbar from '../Components/Navbar';
import IMAGES from '../Assets/images';
import './Auth.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
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
          {/* Left - Image */}
          <div className="auth-image-side">
            <img src={IMAGES.car1} alt="Racing car" className="auth-image" />
            <div className="auth-image-overlay">
              <h2 className="auth-image-title">WELCOME BACK</h2>
              <p className="auth-image-text">Get back on the track. Your racing community awaits.</p>
            </div>
          </div>

          {/* Right - Form */}
          <div className="auth-form-side">
            <div className="auth-form-wrapper">
              <div className="auth-brand">
                <span className="auth-brand-race">RACE</span>
                <span className="auth-brand-line">LINE</span>
              </div>
              <h1 className="auth-title">Log In</h1>
              <p className="auth-subtitle">Sign in to access your racing dashboard</p>

              {error && <div className="auth-error">{error}</div>}

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-field">
                  <label className="auth-label">Email</label>
                  <input
                    type="email"
                    className="auth-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="auth-field">
                  <label className="auth-label">Password</label>
                  <div className="auth-password-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="auth-input"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="auth-toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                <div className="auth-options">
                  <label className="auth-remember">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <a href="#forgot" className="auth-forgot">Forgot password?</a>
                </div>

                <button type="submit" className="auth-submit-btn" disabled={loading}>
                  {loading ? 'LOGGING IN...' : 'LOG IN'}
                </button>
              </form>

              <div className="auth-divider">
                <span className="auth-divider-line"></span>
                <span className="auth-divider-text">OR</span>
                <span className="auth-divider-line"></span>
              </div>

              <button className="auth-social-btn">
                <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59A14.5 14.5 0 0 1 9.5 24c0-1.59.28-3.14.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.77.9 7.35 2.56 10.52l7.97-5.93z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 5.93C6.51 42.62 14.62 48 24 48z"/></svg>
                Continue with Google
              </button>

              <p className="auth-switch">
                Don't have an account? <Link to="/signup" className="auth-switch-link">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
