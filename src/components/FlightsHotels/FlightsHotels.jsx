import React from 'react'
import { Link } from 'react-router-dom'
import './FlightsHotels.css'

const FlightsHotels = () => {
  return (
    <section className="flights-hotels">
      <div className="container">
        <div className="flights-hotels-grid">
          <div className="hero-card flights-card">
            <div className="hero-card-background"></div>
            <div className="hero-card-content">
              <h2 className="hero-card-title">Flights</h2>
              <p className="hero-card-subtitle">Search Flights & Stays to our most popular destinations</p>
              <Link to="/find-flight" className="card-button">
                <i className="fas fa-plane"></i>
                Show Flights
              </Link>
            </div>
          </div>

          <div className="hero-card hotels-card">
            <div className="hero-card-background"></div>
            <div className="hero-card-content">
              <h2 className="hero-card-title">Hotels</h2>
              <p className="hero-card-subtitle">Search hotels & Stays to our most popular destinations</p>
              <Link to="/hotel-search-results" className="card-button">
                <i className="fas fa-bed"></i>
                Show Hotels
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FlightsHotels

