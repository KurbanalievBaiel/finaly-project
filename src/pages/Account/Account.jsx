import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile, addCard } from '../../store/slices/authSlice';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Account.css';

const Account = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({ number: '', expiry: '', brand: 'VISA' });
  const dispatch = useDispatch();

  const handleEdit = (field, value) => {
    setEditingField(field);
    setEditValue(value);
  };

  const handleSave = () => {
    const updateData = {};
    if (editingField === 'Name') {
      const [first, ...rest] = editValue.split(' ');
      updateData.firstName = first || '';
      updateData.lastName = rest.join(' ') || '';
    } else if (editingField === 'Phone number') {
      updateData.phone = editValue;
    } else if (editingField === 'Date of birth') {
      updateData.dob = editValue;
    } else {
      updateData[editingField.toLowerCase()] = editValue;
    }
    
    dispatch(updateProfile(updateData));
    setEditingField(null);
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!newCard.number || !newCard.expiry) return;
    
    dispatch(addCard({
      brand: newCard.brand,
      last4: newCard.number.slice(-4),
      expiry: newCard.expiry
    }));
    
    setNewCard({ number: '', expiry: '', brand: 'VISA' });
    setShowAddCard(false);
  };

  const handleDownloadTicket = (booking) => {
    alert(`Generating ticket for ${booking.type === 'flight' ? booking.item.airline : booking.item.name}...\nTicket downloaded successfully!`);
  };

  // Если пользователь не авторизован, перенаправляем на логин
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const tabs = [
    { id: 'profile', label: 'Account' },
    { id: 'history', label: 'History' },
    { id: 'payment', label: 'Payment methods' }
  ];

  return (
    <div className="account-page">
      <Header />
      
      <div className="account-container-wrapper">
        <div className="container">
          <div className="account-hero-v2">
          <div className="hero-banner-slanted">
            <div className="slanted-overlay"></div>
          </div>
          <div className="hero-profile-info">
            <div className="large-avatar-container">
              <img src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} alt="Profile" />
              <button className="edit-avatar-badge">✎</button>
            </div>
            <h1 className="hero-name">{user.firstName} {user.lastName}</h1>
            <p className="hero-email">{user.email}</p>
          </div>
        </div>

        <div className="account-tabs-nav">
          {tabs.map(tab => (
            <button 
              key={tab.id} 
              className={`nav-tab-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="account-main-content">
          {activeTab === 'profile' && (
            <div className="account-details-section">
              <h2 className="section-main-title">Account</h2>
              <div className="info-rows">
                {[
                  { label: 'Name', value: `${user.firstName} ${user.lastName}` },
                  { label: 'Email', value: user.email },
                  { label: 'Password', value: '************' },
                  { label: 'Phone number', value: user.phone || '+1 000-000-0000' },
                  { label: 'Address', value: user.address || 'Main Street, San Francisco, CA' },
                  { label: 'Date of birth', value: user.dob || '01-01-1992' }
                ].map((field) => (
                  <div className="info-row" key={field.label}>
                    <div className="row-label">{field.label}</div>
                    <div className="row-content">
                      {editingField === field.label ? (
                        <div className="edit-input-wrapper">
                          <input 
                            type={field.label === 'Password' ? 'password' : 'text'} 
                            className="edit-input"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            autoFocus
                          />
                          <div className="edit-actions">
                            <button className="save-btn" onClick={handleSave}>Save</button>
                            <button className="cancel-btn" onClick={() => setEditingField(null)}>Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="row-value">{field.value}</div>
                          <button className="change-btn" onClick={() => handleEdit(field.label, field.value === '************' ? '' : field.value)}>Change</button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="history-section">
              <div className="section-header-row">
                <h2 className="section-main-title">Tickets/Bookings</h2>
                <div className="history-filters">
                  <button className="filter-chip active">Flights</button>
                  <button className="filter-chip">Hotels</button>
                </div>
              </div>
              <div className="bookings-list">
                {user.bookings && user.bookings.length > 0 ? (
                  user.bookings.map((booking) => (
                    <div key={booking.id} className="booking-item-card">
                      <div className={`booking-type-icon ${booking.type}`}>
                        {booking.type === 'flight' ? '✈' : '🏨'}
                      </div>
                      <div className="booking-details">
                        <div className="booking-meta">
                          {booking.type === 'flight' 
                            ? `${booking.item.departure.city} (${booking.item.departure.airport}) → ${booking.item.arrival.city} (${booking.item.arrival.airport})`
                            : booking.item.name}
                        </div>
                        <div className="booking-time-price">
                          {booking.type === 'flight' 
                            ? `${booking.item.departure.time} - ${booking.item.arrival.time} | $${booking.item.price}`
                            : `${booking.item.location} | $${booking.item.price}/night`}
                        </div>
                        <div className="booking-date">{booking.date}</div>
                      </div>
                      <button className="download-ticket-btn" onClick={() => handleDownloadTicket(booking)}>
                        {booking.type === 'flight' ? 'Download Ticket' : 'View Receipt'}
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="no-bookings">
                    <p>No bookings found. Start your journey today!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="payment-section">
              <h2 className="section-main-title">Payment methods</h2>
              <div className="cards-grid">
                {(user.cards || [{ id: 'card-1', brand: 'VISA', last4: '4321', expiry: '02/27' }]).map(card => (
                  <div key={card.id} className={`payment-card-item ${card.brand.toLowerCase()}`}>
                    <div className="card-chip"></div>
                    <div className="card-number">**** **** **** {card.last4}</div>
                    <div className="card-footer">
                      <div className="card-expiry">{card.expiry}</div>
                      <div className="card-brand">{card.brand}</div>
                    </div>
                  </div>
                ))}
                
                {showAddCard ? (
                  <form className="add-payment-card-form" onSubmit={handleAddCard}>
                    <input 
                      type="text" 
                      placeholder="Card Number" 
                      maxLength="16"
                      value={newCard.number}
                      onChange={(e) => setNewCard({...newCard, number: e.target.value})}
                      required
                    />
                    <div className="form-row-small">
                      <input 
                        type="text" 
                        placeholder="MM/YY" 
                        maxLength="5"
                        value={newCard.expiry}
                        onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                        required
                      />
                      <select 
                        value={newCard.brand}
                        onChange={(e) => setNewCard({...newCard, brand: e.target.value})}
                      >
                        <option value="VISA">VISA</option>
                        <option value="MASTERCARD">MasterCard</option>
                      </select>
                    </div>
                    <div className="form-actions">
                      <button type="submit" className="save-btn">Add</button>
                      <button type="button" className="cancel-btn" onClick={() => setShowAddCard(false)}>Back</button>
                    </div>
                  </form>
                ) : (
                  <div className="add-payment-card" onClick={() => setShowAddCard(true)}>
                    <div className="plus-icon">+</div>
                    <span>Add a new card</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      </div>

      <div className="newsletter-section">
        <div className="container">
          <div className="newsletter-wrapper">
            <div className="newsletter-content">
              <h2 className="newsletter-title">Subscribe Newsletter</h2>
              <div className="newsletter-brand">The Travel</div>
              <p className="newsletter-description">
                Get inspired! Receive travel discounts, tips and behind the scenes stories.
              </p>
              <div className="newsletter-form">
                <input type="email" placeholder="Your email address" className="newsletter-input" />
                <button className="newsletter-btn">Subscribe</button>
              </div>
            </div>
            <div className="newsletter-image">
              <div className="mailbox-illustration">
                <svg width="200" height="150" viewBox="0 0 400 300" fill="none">
                  <rect x="50" y="100" width="300" height="150" rx="40" fill="#4B5E4B" />
                  <rect x="300" y="150" width="80" height="40" fill="#FF8682" />
                  <rect x="180" y="250" width="40" height="50" fill="#C4A484" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Account;
