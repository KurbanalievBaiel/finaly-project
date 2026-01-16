import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateFlightsSearch, swapLocations } from '../../store/slices/searchSlice'
import { useNavigate } from 'react-router-dom'
import './FlightSearchForm.css'

const FlightSearchForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [from, setFrom] = useState('Lahore - Karachi')
  const [to, setTo] = useState('')
  const [tripType, setTripType] = useState('Return')
  const [departureDate, setDepartureDate] = useState('2022-11-07')
  const [returnDate, setReturnDate] = useState('2022-11-13')
  const [passengers, setPassengers] = useState(1)
  const [classType, setClassType] = useState('Economy')

  const handleSwap = () => {
    const temp = from
    setFrom(to || '')
    setTo(temp)
    dispatch(swapLocations())
  }

  const handleSearch = () => {
    dispatch(updateFlightsSearch({
      from: from.split(' - ')[0],
      to: to || '',
      tripType,
      departureDate,
      passengers,
      class: classType,
    }))
    navigate('/flight-search-results')
  }

  return (
    <section className="flight-search-form">
      <div className="container">
        <h2 className="form-title">Where are you flying?</h2>
        <div className="search-form-card">
          <div className="form-row">
            <div className="form-field">
              <label>From</label>
              <div className="location-input">
                <span className="location-text">{from}</span>
                <button className="swap-btn" onClick={handleSwap} aria-label="Swap locations">
                  <i className="fas fa-exchange-alt"></i>
                </button>
              </div>
            </div>
            <div className="form-field">
              <label>To</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter destination"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>Trip</label>
              <div className="trip-selector">
                <select
                  className="form-select"
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                >
                  <option>Return</option>
                  <option>One-way</option>
                  <option>Multi-city</option>
                </select>
                {tripType === 'Return' && (
                  <div className="date-range">
                    <input
                      type="date"
                      className="date-input-small"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                    />
                    <span> - </span>
                    <input
                      type="date"
                      className="date-input-small"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="form-field">
              <label>Passenger</label>
              <div className="passenger-input">
                <span>{passengers} Passenger, {classType}</span>
                <i className="fas fa-chevron-down"></i>
              </div>
            </div>
          </div>
          <div className="form-actions">
            <button className="promo-link" onClick={() => alert('Enter promo code: TRAVEL2026')}>+ Add Promo Code</button>
            <button className="btn-search" onClick={handleSearch}>
              Show Flights
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FlightSearchForm

