import React, { useState } from 'react'
import './Newsletter.css'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 5000)
  }

  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h2 className="newsletter-title">Subscribe Newsletter</h2>
            <h3 className="newsletter-subtitle">gσlobe</h3>
            <p className="newsletter-description">
              Get inspired! Receive travel discounts, tips and behind the scenes stories.
            </p>
            {subscribed ? (
              <div className="newsletter-success">
                <h3>Thanks for subscribing!</h3>
                <p>You'll receive our best offers soon.</p>
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="newsletter-button">
                  Subscribe
                </button>
              </form>
            )}
          </div>
          <div className="newsletter-illustration">
            <div className="mailbox-illustration">
              <div className="mailbox-body"></div>
              <div className="mailbox-flag"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter

