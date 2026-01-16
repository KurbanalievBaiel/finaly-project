import React from 'react'
import SearchWidget from '../SearchWidget/SearchWidget'
import './Hero.css'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background"></div>
      <div className="hero-content">
        <p className="hero-small-text">Helping Others</p>
        <h2 className="hero-title">LIVE & TRAVEL</h2>
        <p className="hero-subtitle">Special offers to suit your plan</p>
      </div>
      <SearchWidget />
    </section>
  )
}

export default Hero
