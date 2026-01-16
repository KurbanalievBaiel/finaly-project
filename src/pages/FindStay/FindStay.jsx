import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Newsletter from '../../components/Newsletter/Newsletter';
import FallIntoTravel from '../../components/FallIntoTravel/FallIntoTravel';
import { useNavigate } from 'react-router-dom';
import './FindStay.css';

const FindStay = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('Istanbul, Turkey');

  const handleSearch = () => {
    navigate('/hotel-search-results');
  };

  return (
    <div className="find-stay-page">
      <Header />
      
      {/* Navigation Tabs */}
      <div className="nav-tabs">
        <div className="container">
          <div className="tabs-wrapper">
            <button className="tab" onClick={() => navigate('/find-flight')}>
              <i className="fas fa-plane"></i>
              Find Flight
            </button>
            <button className="tab active">
              <i className="fas fa-bed"></i>
              Find Stays
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="stay-hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1 className="hero-title">Make your travel wishlist, we'll do the rest</h1>
          <p className="hero-subtitle">Special offers to suit your plan</p>
        </div>
      </section>

      {/* Stay Search Form */}
      <section className="stay-search-form">
        <div className="container">
          <h2 className="form-title">Where are you staying?</h2>
          <div className="search-form-card">
            <div className="form-row">
              <div className="form-field">
                <label>Destination</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={destination} 
                  onChange={(e) => setDestination(e.target.value)} 
                />
              </div>
              <div className="form-field">
                <label>Check In</label>
                <input type="date" className="form-input" defaultValue="2022-12-02" />
              </div>
              <div className="form-field">
                <label>Check Out</label>
                <input type="date" className="form-input" defaultValue="2022-12-04" />
              </div>
              <div className="form-field">
                <label>Rooms & Guests</label>
                <input type="text" className="form-input" defaultValue="1 Room, 2 Guests" />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn-search" onClick={handleSearch}>
                Show Hotels
              </button>
            </div>
          </div>
        </div>
      </section>

      <FallIntoTravel />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default FindStay;
