import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { addBooking } from '../../store/slices/authSlice';
import { bookingAPI } from '../../api/api';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './BookingDetail.css';

const BookingDetail = () => {
  const { isAuthenticated, user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const bookingItem = location.state?.item;
  const bookingType = location.state?.type; // 'flight' or 'hotel'

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    paymentMethod: 'card-1' // Default to first card if exists
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!bookingItem) {
      navigate('/');
    }
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname, item: bookingItem, type: bookingType } });
    }
  }, [bookingItem, isAuthenticated, navigate, location.pathname, bookingType]);

  if (!bookingItem || !user) return null;

  const handleBooking = async () => {
    setLoading(true);
    setError('');

    try {
      const bookingData = {
        userId: user.id,
        itemId: bookingItem.id,
        type: bookingType,
        travelerInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        },
        paymentMethod: formData.paymentMethod,
        itemDetails: bookingItem,
        totalPrice: bookingItem.price + 45,
        bookingDate: new Date().toISOString()
      };

      const response = await bookingAPI.createBooking(bookingData, token);

      if (response.success) {
        dispatch(addBooking({
          item: bookingItem,
          type: bookingType
        }));
        navigate('/booking-success', { state: { item: bookingItem, type: bookingType } });
      } else {
        setError(response.error || 'Booking failed');
      }
    } catch (err) {
      console.error('Error creating booking:', err);
      setError('An error occurred while creating your booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-detail-page">
      <Header />
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      
      <div className="container">
        <div className="booking-layout">
          <div className="booking-main">
            <h1 className="booking-title">Review and Book</h1>
            
            <section className="booking-section item-summary">
              <div className="summary-header">
                <h2>{bookingType === 'flight' ? 'Flight Details' : 'Hotel Details'}</h2>
              </div>
              <div className="summary-card">
                {bookingType === 'flight' ? (
                  <div className="flight-summary">
                    <div className="summary-left">
                      <img 
                        src={bookingItem.logo} 
                        alt={bookingItem.airline} 
                        className="airline-logo" 
                        onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${bookingItem.airline}&background=8DD3BB&color=fff` }}
                      />
                      <div>
                        <h3>{bookingItem.airline}</h3>
                        <p>{bookingItem.departure.city} → {bookingItem.arrival.city}</p>
                      </div>
                    </div>
                    <div className="summary-right">
                      <div className="price-info">
                        <span className="price">${bookingItem.price}</span>
                        <span className="duration">{bookingItem.duration}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="hotel-summary">
                    <img src={bookingItem.image} alt={bookingItem.name} className="hotel-img" />
                    <div className="hotel-info">
                      <h3>{bookingItem.name}</h3>
                      <p className="location">{bookingItem.location}</p>
                      <div className="rating">
                        <span className="badge">{bookingItem.ratingValue}</span>
                        <span>{bookingItem.ratingText} ({bookingItem.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section className="booking-section traveler-info">
              <h2>Traveler Information</h2>
              <div className="info-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" value={formData.firstName} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" value={formData.lastName} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" value={formData.email} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" placeholder="+1 234 567 890" />
                  </div>
                </div>
              </div>
            </section>

            <section className="booking-section payment-section">
              <h2>Select Payment Method</h2>
              <div className="payment-options">
                <label className="payment-option active">
                  <input type="radio" name="payment" defaultChecked />
                  <div className="payment-card-mini">
                    <span className="card-type">VISA</span>
                    <span className="card-num">**** 4321</span>
                  </div>
                </label>
                <button className="add-new-card-btn">+ Add new card</button>
              </div>
            </section>

            <div className="booking-actions">
              <button className="confirm-booking-btn" onClick={handleBooking} disabled={loading}>
                {loading ? 'Processing Booking...' : 'Confirm and Book'}
              </button>
            </div>
          </div>

          <aside className="booking-sidebar">
            <div className="price-summary-card">
              <h3>Price Summary</h3>
              <div className="price-row">
                <span>Base Fare</span>
                <span>${bookingItem.price}</span>
              </div>
              <div className="price-row">
                <span>Taxes & Fees</span>
                <span>$45</span>
              </div>
              <div className="price-row">
                <span>Total</span>
                <span className="total-price">${bookingItem.price + 45}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingDetail;
