import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import './Header.css'

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <button className="menu-toggle" onClick={toggleMenu}>
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
        <div className={`nav-left ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/find-flight" className="nav-link">
            <i className="fas fa-plane"></i>
            <span>Find Flights</span>
          </Link>
          <Link to="/find-stay" className="nav-link">
            <i className="fas fa-bed"></i>
            <span>Find Stays</span>
          </Link>
        </div>
        <div className="nav-center">
          <Link to="/" className="logo-link">
            <h1 className="logo">gσlobe</h1>
          </Link>
        </div>
        <div className={`nav-right ${isMenuOpen ? 'open' : ''}`}>
          {isAuthenticated ? (
            <div className="user-nav">
              <Link to="/account" className="user-profile-link" onClick={() => setIsMenuOpen(false)}>
                <img 
                  src={user.avatar || `https://ui-avatars.com/api/?name=${user.firstName}&background=8DD3BB&color=fff`} 
                  alt="User" 
                  className="nav-avatar" 
                  onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${user.firstName}&background=8DD3BB&color=fff` }}
                />
                <span className="nav-username">{user.firstName}</span>
              </Link>
              <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="btn-logout">Logout</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="btn-signup" onClick={() => setIsMenuOpen(false)}>Sign up</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header

