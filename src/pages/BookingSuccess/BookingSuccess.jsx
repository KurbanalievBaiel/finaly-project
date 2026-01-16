import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './BookingSuccess.css';

const BookingSuccess = () => {
  const location = useLocation();
  const bookingType = location.state?.type;

  return (
    <div className="booking-success-page">
      <Header />
      
      <div className="container">
        <div className="success-content">
          <div className="success-icon">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="40" fill="#8DD3BB" />
              <path d="M26 40L36 50L54 30" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1>Booking Successful!</h1>
          <p>Your {bookingType === 'flight' ? 'flight ticket' : 'hotel reservation'} has been confirmed.</p>
          <div className="success-actions">
            <Link to="/account" className="btn-view-bookings">View Bookings</Link>
            <Link to="/" className="btn-home">Go Home</Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingSuccess;
