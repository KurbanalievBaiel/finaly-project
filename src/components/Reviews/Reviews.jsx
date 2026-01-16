import React from 'react'
import './Reviews.css'

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      quote: 'A real sense of community, nurtured',
      text: 'Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.',
      rating: 5,
      name: 'Olga',
      affiliation: 'Weave Studios - Kai Tak',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      quote: 'The facilities are superb. Clean, slick, bright.',
      text: 'Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country.',
      rating: 5,
      name: 'Thomas',
      affiliation: 'Weave Studios - Olympic',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      quote: 'A real sense of community, nurtured',
      text: 'Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.',
      rating: 5,
      name: 'Eliot',
      affiliation: 'Weave Studios - Kai Tak',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop',
    },
  ]

  return (
    <section className="reviews">
      <div className="container">
        <div className="reviews-header">
          <div>
            <h2 className="section-title">Reviews</h2>
            <p className="section-subtitle">What people say about Golobe facilities</p>
          </div>
          <button className="btn-see-all">See All</button>
        </div>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-content">
                <h3 className="review-quote">"{review.quote}"</h3>
                <p className="review-text">{review.text}</p>
                <a href="#" className="review-link">
                  View more
                </a>
                <div className="review-rating">
                  {[...Array(review.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
                <div className="review-author">
                  <div>
                    <p className="author-name">{review.name}</p>
                    <p className="author-affiliation">{review.affiliation}</p>
                  </div>
                  <div className="google-logo">
                    <i className="fab fa-google"></i>
                  </div>
                </div>
              </div>
              <div
                className="review-image"
                style={{ backgroundImage: `url(${review.image})` }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews

