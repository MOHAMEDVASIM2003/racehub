import React, { useState } from "react";
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../Pages/Style.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <div className="navbar-btn">
      {/* Logo */}
      <Link to="/" className="nav-logo">RACE<span className="nav-logo-accent">LINE</span></Link>

      {/* Desktop nav links */}
      <div className="nav-links-desktop">
        <Link to="/events"    className="nav-link">EVENTS</Link>
        <Link to="/community" className="nav-link">COMMUNITY</Link>
        <Link to="/garage"    className="nav-link">GARAGE</Link>
        <Link to="/media"     className="nav-link">MEDIA</Link>
      </div>

      {/* Desktop right */}
      <div className="nav-right-desktop">
        {user ? (
          <>
            <span className="nav-link" style={{ cursor: 'default' }}>Hi, {user.name.split(' ')[0]}</span>
            <button onClick={handleLogout} className="nav-login-icon" title="Logout" style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 'inherit' }}>
              <FaSignOutAlt />
            </button>
          </>
        ) : (
          <>
            <Link to="/join" className="nav-link-join">JOIN NOW</Link>
            <Link to="/login" className="nav-login-icon" title="Login"><FaUserCircle /></Link>
          </>
        )}
      </div>

      {/* Mobile hamburger */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/"          className="mobile-link" onClick={() => setMenuOpen(false)}>HOME</Link>
          <Link to="/events"    className="mobile-link" onClick={() => setMenuOpen(false)}>EVENTS</Link>
          <Link to="/community" className="mobile-link" onClick={() => setMenuOpen(false)}>COMMUNITY</Link>
          <Link to="/garage"    className="mobile-link" onClick={() => setMenuOpen(false)}>GARAGE</Link>
          <Link to="/media"     className="mobile-link" onClick={() => setMenuOpen(false)}>MEDIA</Link>
          {user ? (
            <button className="mobile-link mobile-join" onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 'inherit', textAlign: 'left', width: '100%' }}>
              LOGOUT
            </button>
          ) : (
            <>
              <Link to="/login" className="mobile-link" onClick={() => setMenuOpen(false)}>LOGIN</Link>
              <Link to="/join"  className="mobile-link mobile-join" onClick={() => setMenuOpen(false)}>JOIN NOW</Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
