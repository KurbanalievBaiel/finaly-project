import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setActiveTab,
  updateFlightsSearch,
  updateStaysSearch,
  swapLocations,
} from '../../store/slices/searchSlice'
import './SearchWidget.css'

const SearchWidget = () => {
  const dispatch = useDispatch()
  const { activeTab, flights, stays } = useSelector((state) => state.search)

  const handleTabChange = (tab) => {
    dispatch(setActiveTab(tab))
  }

  const handleSwapLocations = () => {
    dispatch(swapLocations())
  }

  const handleFlightsChange = (field, value) => {
    dispatch(updateFlightsSearch({ [field]: value }))
  }

  const handleStaysChange = (field, value) => {
    dispatch(updateStaysSearch({ [field]: value }))
  }

  const handleSearch = () => {
    if (activeTab === 'flights') {
      console.log('Searching flights:', flights)
    } else {
      console.log('Searching stays:', stays)
    }
  }

  return (
    <div className="search-widget">
      <div className="search-tabs">
        <button
          className={`tab-btn ${activeTab === 'flights' ? 'active' : ''}`}
          onClick={() => handleTabChange('flights')}
        >
          <i className="fas fa-plane"></i>
          <span>Flights</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'stays' ? 'active' : ''}`}
          onClick={() => handleTabChange('stays')}
        >
          <i className="fas fa-bed"></i>
          <span>Stays</span>
        </button>
      </div>

      {activeTab === 'flights' ? (
        <div className="search-form">
          <div className="form-row">
            <div className="form-field">
              <label>From - To</label>
              <div className="location-input">
                <span className="location-text">
                  {flights.from} - {flights.to}
                </span>
                <button className="swap-btn" onClick={handleSwapLocations} aria-label="Swap locations">
                  <i className="fas fa-exchange-alt"></i>
                </button>
              </div>
            </div>
            <div className="form-field">
              <label>Trip</label>
              <select
                className="form-select"
                value={flights.tripType}
                onChange={(e) => handleFlightsChange('tripType', e.target.value)}
              >
                <option>Return</option>
                <option>One-way</option>
                <option>Multi-city</option>
              </select>
            </div>
            <div className="form-field">
              <label>Departure</label>
              <div className="date-input">
                <i className="fas fa-calendar-alt"></i>
                <input
                  type="date"
                  className="date-picker"
                  value={flights.departureDate}
                  onChange={(e) => handleFlightsChange('departureDate', e.target.value)}
                />
              </div>
            </div>
            <div className="form-field">
              <label>Passenger - Class</label>
              <div className="passenger-input">
                <span>
                  {flights.passengers} Passenger{flights.passengers !== 1 ? 's' : ''}, {flights.class}
                </span>
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
          </div>
          <div className="form-actions">
            <a href="#" className="promo-link">
              + Add Promo Code
            </a>
            <button className="btn-search" onClick={handleSearch}>
              Show Flights
            </button>
          </div>
        </div>
      ) : (
        <div className="search-form">
          <div className="form-row">
            <div className="form-field">
              <label>Location</label>
              <input
                type="text"
                placeholder="Where are you going?"
                className="form-input"
                value={stays.location}
                onChange={(e) => handleStaysChange('location', e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>Check-in</label>
              <div className="date-input">
                <i className="fas fa-calendar-alt"></i>
                <input
                  type="date"
                  className="date-picker"
                  value={stays.checkIn}
                  onChange={(e) => handleStaysChange('checkIn', e.target.value)}
                />
              </div>
            </div>
            <div className="form-field">
              <label>Check-out</label>
              <div className="date-input">
                <i className="fas fa-calendar-alt"></i>
                <input
                  type="date"
                  className="date-picker"
                  value={stays.checkOut}
                  onChange={(e) => handleStaysChange('checkOut', e.target.value)}
                />
              </div>
            </div>
            <div className="form-field">
              <label>Guests</label>
              <div className="passenger-input">
                <span>{stays.guests} Guest{stays.guests !== 1 ? 's' : ''}</span>
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
          </div>
          <div className="form-actions">
            <a href="#" className="promo-link">
              + Add Promo Code
            </a>
            <button className="btn-search" onClick={handleSearch}>
              Show Stays
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchWidget

