import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { destinationsAPI } from '../../api/api'
import './Destinations.css'

const Destinations = () => {
  const dispatch = useDispatch()
  const destinations = useSelector((state) => state.destinations.destinations)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Mock destinations data as fallback
  const mockDestinations = [
    {
      id: 1,
      name: 'Paris',
      country: 'France',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&h=300&fit=crop',
      flights: 1200,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Tokyo',
      country: 'Japan',
      image: 'https://images.unsplash.com/photo-1540959375944-7049f642e9ab?w=500&h=300&fit=crop',
      flights: 1500,
      rating: 4.7
    },
    {
      id: 3,
      name: 'Dubai',
      country: 'UAE',
      image: 'https://images.unsplash.com/photo-1518684079-3c830dcccb48?w=500&h=300&fit=crop',
      flights: 800,
      rating: 4.6
    },
    {
      id: 4,
      name: 'New York',
      country: 'USA',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&h=300&fit=crop',
      flights: 950,
      rating: 4.8
    },
    {
      id: 5,
      name: 'London',
      country: 'UK',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&h=300&fit=crop',
      flights: 700,
      rating: 4.6
    },
    {
      id: 6,
      name: 'Barcelona',
      country: 'Spain',
      image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=500&h=300&fit=crop',
      flights: 650,
      rating: 4.7
    }
  ]

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await destinationsAPI.getDestinations()
        if (response.success) {
          console.log('Destinations loaded from API:', response.data)
        } else {
          // API failed, use mock data
          console.log('Using fallback mock destinations data')
        }
      } catch (err) {
        console.error('Error fetching destinations:', err)
        // Don't show error to user, just use mock data
      } finally {
        setLoading(false)
      }
    }

    fetchDestinations()
  }, [dispatch])

  // Use mock data if Redux store is empty
  const destinationsToDisplay = destinations && destinations.length > 0 ? destinations : mockDestinations

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

        {error && <div className="error-message">{error}</div>}

        <div className="destinations-grid">
          {destinationsToDisplay.map((destination) => (
            <div key={destination.id} className="destination-card">
              <div
                className="destination-card-image"
                style={{ backgroundImage: `url(${destination.image})` }}
              ></div>
              <div className="destination-card-content">
                <h3 className={`destination-card-title ${destination.city === 'Baku' ? 'highlight' : ''}`}>
                  {destination.name || destination.city}, {destination.country}
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

