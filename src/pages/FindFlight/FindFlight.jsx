import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import FlightSearchForm from '../../components/FlightSearchForm/FlightSearchForm'
import WorldMap from '../../components/WorldMap/WorldMap'
import FallIntoTravel from '../../components/FallIntoTravel/FallIntoTravel'
import Newsletter from '../../components/Newsletter/Newsletter'
import Footer from '../../components/Footer/Footer'
import './FindFlight.css'
const FindFlight = () => {
  const navigate = useNavigate()
  return (
    <div className="find-flight-page">
      <Header />
      
      {/* Navigation Tabs */}
      <div className="nav-tabs">
        <div className="container">
          <div className="tabs-wrapper">
            <button className="tab active">
              <i className="fas fa-plane"></i>
              Find Flight
            </button>
            <button className="tab" onClick={() => navigate('/find-stay')}>
              <i className="fas fa-bed"></i>
              Find Stays
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="flight-hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1 className="hero-title">Make your travel wishlist, we'll do the rest</h1>
          <p className="hero-subtitle">Special offers to suit your plan</p>
        </div>
      </section>

      {/* Flight Search Form */}
      <FlightSearchForm />

      {/* Let's go places together */}
      <WorldMap />

      {/* Fall into travel sections */}
      <FallIntoTravel />

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default FindFlight

