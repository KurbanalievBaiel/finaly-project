import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../store/slices/authSlice';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './HotelSearchResults.css';

const HotelSearchResults = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  // Состояние для активной сортировки
  const [activeTab, setActiveTab] = useState('best');
  
  const { stays } = useSelector((state) => state.search);
  
  // Состояние для фильтров
  const [filters, setFilters] = useState({
    price: 1500,
    rating: '0+',
    freebies: [],
    amenities: [],
    destination: stays.location || ''
  });

  // Моковые данные отелей
  const initialHotels = [
    {
      id: 1,
      name: 'CVK Park Bosphorus Hotel Istanbul',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ratingValue: 4.2,
      ratingText: 'Very Good',
      reviews: 54,
      location: 'Gümüşsuyu Mah. İnönü Cad. No:8, Istanbul 34437',
      price: 240,
      amenities: ['Free Wi-Fi', 'Pool', 'Spa'],
      duration: '2h 28m' // Для соответствия вкладке 'Quickest' если нужно
    },
    {
      id: 2,
      name: 'Erin Beach & Spa Resort',
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ratingValue: 4.8,
      ratingText: 'Exceptional',
      reviews: 120,
      location: 'North Male Atoll, Maldives',
      price: 450,
      amenities: ['Free Wi-Fi', 'Gym', 'Restaurant'],
      duration: '1h 45m'
    },
    {
      id: 3,
      name: 'The Ritz-Carlton, Dubai',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ratingValue: 4.9,
      ratingText: 'Superb',
      reviews: 200,
      location: 'The Walk, Jumeirah Beach Residence, Dubai',
      price: 600,
      amenities: ['Free Wi-Fi', 'Pool', 'Private Beach'],
      duration: '3h 10m'
    },
    {
      id: 4,
      name: 'London House Chicago',
      image: 'https://images.unsplash.com/photo-1551882547-ff43c61f32a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ratingValue: 4.4,
      ratingText: 'Fabulous',
      reviews: 89,
      location: '85 East Wacker Drive, Chicago, IL 60601',
      price: 320,
      amenities: ['Free Wi-Fi', 'Bar', 'Gym'],
      duration: '2h 15m'
    }
  ];

  // Логика фильтрации и сортировки
  const filteredHotels = initialHotels.filter(hotel => {
    if (hotel.price > filters.price) return false;
    // Search filter
    if (filters.destination && !hotel.location.toLowerCase().includes(filters.destination.toLowerCase().trim()) && !hotel.name.toLowerCase().includes(filters.destination.toLowerCase().trim())) return false;
    
    return true;
  });

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    if (activeTab === 'cheapest') return a.price - b.price;
    if (activeTab === 'best') return b.ratingValue - a.ratingValue;
    // Условно "Quickest" для отелей может быть по времени заезда или просто для галочки
    if (activeTab === 'quickest') return a.duration.localeCompare(b.duration);
    return 0;
  });

  const tabs = [
    { id: 'cheapest', label: 'Cheapest', info: '$240 . 2h 28m' },
    { id: 'best', label: 'Best', info: '$320 . 2h 15m' },
    { id: 'quickest', label: 'Quickest', info: '$450 . 1h 45m' }
  ];

  const freebiesList = [
    { id: 'breakfast', label: 'Free Breakfast' },
    { id: 'parking', label: 'Free Parking' },
    { id: 'wifi', label: 'Free Wi-Fi' }
  ];

  const amenitiesList = [
    { id: 'front-desk', label: '24-hour front desk' },
    { id: 'pool', label: 'Pool' },
    { id: 'gym', label: 'Gym' },
    { id: 'spa', label: 'Spa' }
  ];

  const handleToggleFavorite = (hotel) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(toggleFavorite({ id: hotel.id, type: 'hotel', item: hotel }));
  };

  const isFavorite = (hotelId) => {
    return user?.wishlist?.some(item => item.id === hotelId && item.type === 'hotel');
  };

  return (
    <div className="hotel-search-results">
      <Header />
      
      {/* Поисковая строка для отелей */}
      <div className="search-bar-section">
        <div className="container">
          <div className="search-bar-wrapper hotel-search-grid">
            <div className="search-field destination">
              <label>Enter Destination</label>
              <div className="field-input">
                <input 
                  type="text" 
                  value={filters.destination} 
                  onChange={(e) => setFilters({...filters, destination: e.target.value})}
                />
              </div>
            </div>
            <div className="search-field check-in-out">
              <label>Check In - Check Out</label>
              <input type="text" defaultValue="Fri 12/2 - Sun 12/4" />
            </div>
            <div className="search-field guests">
              <label>Rooms & Guests</label>
              <input type="text" defaultValue="1 room, 2 guests" />
            </div>
            <button className="search-submit-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="results-layout">
          {/* Боковая панель фильтров */}
          <aside className="filters-sidebar">
            <h2 className="sidebar-title">Filters</h2>
            
            <div className="filter-section">
              <div className="section-header">
                <h3 className="filter-title">Price</h3>
                <span className="toggle-icon">^</span>
              </div>
              <div className="price-range-wrapper">
                <input 
                  type="range" 
                  min="50" 
                  max="1500" 
                  value={filters.price}
                  onChange={(e) => setFilters({...filters, price: parseInt(e.target.value)})}
                  className="range-slider" 
                />
                <div className="range-labels">
                  <span>$50</span>
                  <span>${filters.price}</span>
                </div>
              </div>
            </div>

            <div className="filter-section">
              <div className="section-header">
                <h3 className="filter-title">Rating</h3>
                <span className="toggle-icon">^</span>
              </div>
              <div className="rating-options">
                {['0+', '1+', '2+', '3+', '4+'].map(r => (
                  <button 
                    key={r} 
                    className={`rating-btn ${filters.rating === r ? 'active' : ''}`}
                    onClick={() => setFilters({...filters, rating: r})}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <div className="section-header">
                <h3 className="filter-title">Freebies</h3>
                <span className="toggle-icon">^</span>
              </div>
              <div className="checkbox-options">
                {freebiesList.map(item => (
                  <label key={item.id} className="custom-checkbox">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    <span className="label-text">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <div className="section-header">
                <h3 className="filter-title">Amenities</h3>
                <span className="toggle-icon">^</span>
              </div>
              <div className="checkbox-options">
                {amenitiesList.map(amenity => (
                  <label key={amenity.id} className="custom-checkbox">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    <span className="label-text">{amenity.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Основной контент (Список отелей) */}
          <main className="results-content">
            <div className="sorting-tabs-wrapper">
              <div className="tabs-header">
                <div className="sorting-tabs">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <div className="tab-label">{tab.label}</div>
                      <div className="tab-info">{tab.info}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="results-meta">
                <div className="showing-count">
                  Showing {sortedHotels.length} of <span className="highlight">256 hotels</span>
                </div>
                <div className="sort-by">
                  Sort by <span className="sort-value">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
                </div>
              </div>
            </div>

            <div className="hotels-list">
              {sortedHotels.map(hotel => (
                <div key={hotel.id} className="hotel-card">
                  <div className="hotel-image">
                    <img src={hotel.image} alt={hotel.name} />
                  </div>
                  <div className="hotel-main-info">
                    <div className="hotel-header">
                      <div className="hotel-info-left">
                        <div className="hotel-rating">
                          <span className="rating-badge">{hotel.ratingValue}</span>
                          <span className="rating-text"><b>{hotel.ratingText}</b> {hotel.reviews} reviews</span>
                        </div>
                        <h3 className="hotel-name">{hotel.name}</h3>
                        <div className="hotel-location">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          {hotel.location}
                        </div>
                      </div>
                      <div className="hotel-price-tag">
                        <span className="price-label">starting from</span>
                        <span className="price-value">${hotel.price}/night</span>
                        <span className="excl-tax">excl. tax</span>
                      </div>
                    </div>
                    
                    <div className="hotel-divider"></div>

                    <div className="hotel-footer">
                      <div className="hotel-amenities-summary">
                        {hotel.amenities.map((amenity, index) => (
                          <span key={index} className="amenity-item">{amenity}</span>
                        ))}
                      </div>
                      <div className="hotel-actions">
                        <button 
                          className={`favorite-btn ${isFavorite(hotel.id) ? 'active' : ''}`}
                          onClick={() => handleToggleFavorite(hotel)}
                        >
                          {isFavorite(hotel.id) ? '❤️' : '♡'}
                        </button>
                        <button className="view-deals-btn" onClick={() => navigate('/booking-detail', { state: { item: hotel, type: 'hotel' } })}>View Place</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button className="show-more-results">Show more results</button>
            </div>
          </main>
        </div>
      </div>

      {/* Секция подписки */}
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

export default HotelSearchResults;
