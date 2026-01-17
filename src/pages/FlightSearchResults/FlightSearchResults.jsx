import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../store/slices/authSlice';
import { flightAPI } from '../../api/api';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './FlightSearchResults.css';

const FlightSearchResults = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('best');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { flights: searchParams } = useSelector((state) => state.search);
  
  // State for filters
  const [filters, setFilters] = useState({
    price: 1200,
    departureTime: 24,
    rating: '0+',
    airlines: [],
    trips: [],
    fromTo: `${searchParams.from} - ${searchParams.to}`,
    tripType: searchParams.tripType
  });

  // Fetch flights on component mount
  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await flightAPI.getFlights();
        if (response.success) {
          setFlights(response.data);
        } else {
          setError(response.error || 'Failed to load flights');
          // Fallback to mock data if API fails
          setFlights(mockFlights);
        }
      } catch (err) {
        console.error('Error fetching flights:', err);
        setError('An error occurred while loading flights');
        setFlights(mockFlights);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  // Mock flight data as fallback
  const mockFlights = [
    {
      id: 1,
      airline: 'Emirates',
      logo: 'https://logo.clearbit.com/emirates.com',
      departure: { time: '12:00 pm', airport: 'LHE', city: 'Lahore' },
      arrival: { time: '01:28 pm', airport: 'KHI', city: 'Karachi' },
      duration: '2h 28m',
      durationMinutes: 148,
      stops: 'non stop',
      price: 104,
      ratingValue: 4.2,
      ratingText: 'Very Good',
      reviews: 54,
      type: 'Emirates'
    },
    {
      id: 2,
      airline: 'flydubai',
      logo: 'https://logo.clearbit.com/flydubai.com',
      departure: { time: '12:00 pm', airport: 'LHE', city: 'Lahore' },
      arrival: { time: '01:28 pm', airport: 'KHI', city: 'Karachi' },
      duration: '2h 28m',
      durationMinutes: 148,
      stops: 'non stop',
      price: 99,
      ratingValue: 4.5,
      ratingText: 'Excellent',
      reviews: 120,
      type: 'flydubai'
    },
    {
      id: 3,
      airline: 'QATAR Airways',
      logo: 'https://logo.clearbit.com/qatarairways.com',
      departure: { time: '12:00 pm', airport: 'LHE', city: 'Lahore' },
      arrival: { time: '01:28 pm', airport: 'KHI', city: 'Karachi' },
      duration: '2h 28m',
      durationMinutes: 148,
      stops: 'non stop',
      price: 150,
      ratingValue: 4.8,
      ratingText: 'Superb',
      reviews: 200,
      type: 'QATAR'
    },
    {
      id: 4,
      airline: 'ETIHAD Airways',
      logo: 'https://logo.clearbit.com/etihad.com',
      departure: { time: '12:00 pm', airport: 'LHE', city: 'Lahore' },
      arrival: { time: '01:28 pm', airport: 'KHI', city: 'Karachi' },
      duration: '2h 28m',
      durationMinutes: 148,
      stops: 'non stop',
      price: 120,
      ratingValue: 4.6,
      ratingText: 'Top Notch',
      reviews: 89,
      type: 'ETIHAD'
    }
  ];

  // Logic for filtering and sorting
  const filteredFlights = flights.filter(flight => {
    // Price filter
    if (flight.price > filters.price) return false;
    
    // Rating filter
    const minRating = parseInt(filters.rating);
    if (flight.ratingValue < minRating) return false;

    // Airlines filter
    // Search filter
    if (filters.fromTo) {
      const fromPart = filters.fromTo.split(' - ')[0]?.toLowerCase().trim();
      if (fromPart && !flight.departure.city.toLowerCase().includes(fromPart)) return false;
    }

    return true;
  });

  const sortedFlights = [...filteredFlights].sort((a, b) => {
    if (activeTab === 'cheapest') return a.price - b.price;
    if (activeTab === 'quickest') return a.durationMinutes - b.durationMinutes;
    if (activeTab === 'best') return b.ratingValue - a.ratingValue;
    return 0;
  });

  const tabs = [
    { id: 'cheapest', label: 'Cheapest', price: '$99', duration: '2h 18m' },
    { id: 'best', label: 'Best', price: '$99', duration: '2h 18m' },
    { id: 'quickest', label: 'Quickest', price: '$99', duration: '2h 18m' }
  ];

  const airlinesList = [
    { id: 'emirates', label: 'Emirates' },
    { id: 'flydubai', label: 'Fly Dubai' },
    { id: 'qatar', label: 'Qatar' },
    { id: 'etihad', label: 'Etihad' }
  ];

  const tripTypes = [
    { id: 'round-trip', label: 'Round trip' },
    { id: 'on-way', label: 'On Way' },
    { id: 'multi-city', label: 'Multi-City' },
    { id: 'flexible', label: 'My Dates Are Flexible' }
  ];

  const toggleAirline = (airlineId) => {
    setFilters(prev => ({
      ...prev,
      airlines: prev.airlines.includes(airlineId) 
        ? prev.airlines.filter(id => id !== airlineId) 
        : [...prev.airlines, airlineId]
    }));
  };

  const handleToggleFavorite = (flight) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(toggleFavorite({ id: flight.id, type: 'flight', item: flight }));
  };

  const isFavorite = (flightId) => {
    return user?.wishlist?.some(item => item.id === flightId && item.type === 'flight');
  };

  return (
    <div className="flight-search-results">
      <Header />
      
      {loading && (
        <div className="loading-message">
          <p>Loading flights...</p>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      
      {/* Search Bar Wrapper */}
      <div className="search-bar-section">
        <div className="container">
          <div className="search-bar-wrapper">
            <div className="search-field from-to">
              <label>From - To</label>
              <div className="field-input">
                <input 
                  type="text" 
                  value={filters.fromTo} 
                  onChange={(e) => setFilters({...filters, fromTo: e.target.value})}
                />
                <button className="swap-btn" onClick={() => {
                  const [from, to] = filters.fromTo.split(' - ');
                  setFilters({...filters, fromTo: `${to || ''} - ${from || ''}`});
                }}>⇌</button>
              </div>
            </div>
            <div className="search-field trip">
              <label>Trip</label>
              <select 
                value={filters.tripType}
                onChange={(e) => setFilters({...filters, tripType: e.target.value})}
              >
                <option>Return</option>
                <option>One Way</option>
              </select>
            </div>
            <div className="search-field dates">
              <label>Depart- Return</label>
              <input type="text" defaultValue="07 Nov 22 - 13 Nov 22" />
            </div>
            <div className="search-field passenger">
              <label>Passenger - Class</label>
              <input type="text" defaultValue="1 Passenger, Economy" />
            </div>
            <button className="search-submit-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="results-layout">
          {/* Filters Sidebar */}
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
                  max="1200" 
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
                <h3 className="filter-title">Airlines</h3>
                <span className="toggle-icon">^</span>
              </div>
              <div className="checkbox-options">
                {airlinesList.map(airline => (
                  <label key={airline.id} className="custom-checkbox">
                    <input 
                      type="checkbox" 
                      checked={filters.airlines.includes(airline.id)}
                      onChange={() => toggleAirline(airline.id)}
                    />
                    <span className="checkmark"></span>
                    <span className="label-text">{airline.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Results Content */}
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
                      <div className="tab-info">{tab.price} . {tab.duration}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="results-meta">
                <div className="showing-count">
                  Showing {sortedFlights.length} of <span className="highlight">257 places</span>
                </div>
                <div className="sort-by">
                  Sort by <span className="sort-value">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
                </div>
              </div>
            </div>

            <div className="flights-list">
              {sortedFlights.map(flight => (
                <div key={flight.id} className="flight-card">
                  <div className="flight-airline-logo">
                    <img src={flight.logo} alt={flight.airline} />
                  </div>
                  <div className="flight-main-info">
                    <div className="flight-rating">
                      <span className="rating-badge">{flight.ratingValue}</span>
                      <span className="rating-text"><b>{flight.ratingText}</b> {flight.reviews} reviews</span>
                    </div>
                    <div className="flight-segments">
                      <div className="segment">
                        <div className="segment-checkbox">
                          <input type="checkbox" />
                        </div>
                        <div className="segment-time">
                          <div className="time-range">{flight.departure.time} - {flight.arrival.time}</div>
                          <div className="airline-name">{flight.airline}</div>
                        </div>
                        <div className="segment-stops">
                          {flight.stops}
                        </div>
                        <div className="segment-duration">
                          <div className="duration-value">{flight.duration}</div>
                          <div className="route-path">{flight.departure.airport}-{flight.arrival.airport}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flight-actions">
                      <button 
                        className={`favorite-btn ${isFavorite(flight.id) ? 'active' : ''}`}
                        onClick={() => handleToggleFavorite(flight)}
                      >
                        {isFavorite(flight.id) ? '❤️' : '♡'}
                      </button>
                      <button className="view-deals-btn" onClick={() => navigate('/booking-detail', { state: { item: flight, type: 'flight' } })}>View Deals</button>
                    </div>
                  </div>
                  <div className="flight-price-tag">
                    <span className="price-label">starting from</span>
                    <span className="price-value">${flight.price}</span>
                  </div>
                </div>
              ))}
              <button className="show-more-results">Show more results</button>
            </div>
          </main>
        </div>
      </div>

      {/* Subscribe Newsletter Section */}
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
                {/* Simplified mailbox illustration using CSS/SVG */}
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

export default FlightSearchResults;