import React from 'react'
import { useSelector } from 'react-redux'
import './Destinations.css'

const Destinations = () => {
  const destinations = useSelector((state) => state.destinations.destinations)

  return (
    <section className="destinations">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Plan your perfect trip</h2>
            <p className="section-subtitle">
              Search Flights & Stays to our most popular destinations
            </p>
          </div>
          <button className="btn-see-more">See more places</button>
        </div>

        <div className="destinations-grid">
          {destinations.map((destination) => (
            <div key={destination.id} className="destination-card">
              <div
                className="destination-card-image"
                style={{ backgroundImage: `url(${destination.image})` }}
              ></div>
              <div className="destination-card-content">
                <h3 className={`destination-card-title ${destination.city === 'Baku' ? 'highlight' : ''}`}>
                  {destination.city}, {destination.country}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Destinations

