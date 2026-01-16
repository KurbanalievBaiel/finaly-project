import React from 'react'
import './Footer.css'

const Footer = () => {
  const destinations = ['Canada', 'Alaska', 'France', 'Iceland']
  const activities = ['Northern Lights', 'Cruising & sailing', 'Multi-activities', 'Kayaking']
  const blogs = ['Bali Travel Guide', 'Sri Lanka Travel Guide', 'Peru Travel Guide', 'Bali Travel Guide']
  const about = ['Our Story', 'Work with us']
  const contact = ['Our Story', 'Work with us']

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h2 className="footer-logo">gσlobe</h2>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Our Destinations</h3>
            <ul className="footer-links">
              {destinations.map((item, index) => (
                <li key={index}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Our Activities</h3>
            <ul className="footer-links">
              {activities.map((item, index) => (
                <li key={index}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Travel Blogs</h3>
            <ul className="footer-links">
              {blogs.map((item, index) => (
                <li key={index}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">About Us</h3>
            <ul className="footer-links">
              {about.map((item, index) => (
                <li key={index}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-title">Contact Us</h3>
            <ul className="footer-links">
              {contact.map((item, index) => (
                <li key={index}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

