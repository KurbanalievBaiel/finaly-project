import React from 'react'
import './WorldMap.css'

const WorldMap = () => {
  return (
    <section className="world-map-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Let's go places together</h2>
          <button className="btn-see-all">See All</button>
        </div>
        <div className="map-container">
          <div className="world-map">
            <div className="map-pin" style={{ top: '25%', left: '45%' }}>
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="map-pin" style={{ top: '30%', left: '75%' }}>
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="map-pin" style={{ top: '40%', left: '50%' }}>
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="map-pin" style={{ top: '50%', left: '20%' }}>
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="map-pin" style={{ top: '60%', left: '60%' }}>
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="map-pin" style={{ top: '70%', left: '85%' }}>
              <i className="fas fa-map-marker-alt"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorldMap

