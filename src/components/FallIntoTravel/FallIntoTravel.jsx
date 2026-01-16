import React from 'react'
import './FallIntoTravel.css'

const FallIntoTravel = () => {
  const destinations = [
    {
      id: 1,
      city: 'Melbourne',
      price: '$700',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      city: 'Paris',
      price: '$600',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      city: 'London',
      price: '$350',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop',
    },
    {
      id: 4,
      city: 'Columbia',
      price: '$700',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop',
    },
  ]

  return (
    <>
      <section className="fall-into-travel">
        <div className="container">
          <h2 className="section-title">Fall into travel</h2>
          <div className="destinations-scroll">
            {destinations.map((destination) => (
              <div key={destination.id} className="destination-card">
                <div
                  className="card-image"
                  style={{ backgroundImage: `url(${destination.image})` }}
                ></div>
                <div className="card-content">
                  <h3 className="card-city">{destination.city}</h3>
                  <div className="card-footer">
                    <span className="card-price">{destination.price}</span>
                    <button className="btn-book">Book Flight</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="backpacking-section">
        <div className="container">
          <div className="backpacking-card">
            <div
              className="backpacking-image"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop')`,
              }}
            ></div>
            <div className="backpacking-content">
              <h2 className="backpacking-title">Backpacking Sri Lanka</h2>
              <p className="backpacking-description">
                Traveling is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.
              </p>
              <div className="backpacking-footer">
                <span className="backpacking-price">$700</span>
                <button className="btn-book">Book Flight</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default FallIntoTravel

