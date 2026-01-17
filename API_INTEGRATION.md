# API Integration Guide

## Overview
The travel application has been fully integrated with a REST API using the following base URL:
```
https://696b6250624d7ddccaa106b5.mockapi.io
```

## API Structure

All API functions are organized by module in `src/api/api.js`:

### Core Helper Function
- `apiCall(endpoint, method, data, token)` - Universal function for making API requests with automatic error handling

### Available API Modules

#### 1. **Authentication API** (`authAPI`)
```javascript
- login(email, password)          // User login
- signup(userData)                // User registration
- logout(token)                   // User logout
- getProfile(userId, token)       // Get user profile
- updateProfile(userId, userData, token) // Update user profile
```

#### 2. **Flight API** (`flightAPI`)
```javascript
- searchFlights(searchParams)      // Search flights with filters
- getFlightDetails(flightId)       // Get specific flight details
- getFlights()                     // Get all available flights
```

#### 3. **Hotel API** (`hotelAPI`)
```javascript
- searchHotels(searchParams)       // Search hotels with filters
- getHotelDetails(hotelId)         // Get specific hotel details
- getHotels()                      // Get all available hotels
```

#### 4. **Booking API** (`bookingAPI`)
```javascript
- createBooking(bookingData, token)      // Create new booking
- getUserBookings(userId, token)         // Get user's bookings
- getBookingDetails(bookingId, token)    // Get booking details
- cancelBooking(bookingId, token)        // Cancel booking
```

#### 5. **Destinations API** (`destinationsAPI`)
```javascript
- getDestinations()                      // Get all destinations
- getDestinationDetails(destinationId)   // Get destination details
```

#### 6. **Reviews API** (`reviewsAPI`)
```javascript
- getReviews(entityType, entityId)       // Get reviews
- createReview(reviewData, token)        // Create review
```

#### 7. **Favorites API** (`favoritesAPI`)
```javascript
- getFavorites(userId, token)            // Get user favorites
- addFavorite(favoriteData, token)       // Add to favorites
- removeFavorite(favoriteId, token)      // Remove from favorites
```

## Integration Status

### Completed Integrations

✅ **Login Page** (`src/pages/Login/Login.jsx`)
- Connected to `authAPI.login()`
- Added loading and error states
- Dispatches auth action on success

✅ **Signup Page** (`src/pages/Signup/Signup.jsx`)
- Connected to `authAPI.signup()`
- Password validation
- Added loading and error states
- Dispatches auth action on success

✅ **Flight Search Results** (`src/pages/FlightSearchResults/FlightSearchResults.jsx`)
- Fetches flights using `flightAPI.getFlights()`
- Falls back to mock data if API fails
- Added loading and error states

✅ **Hotel Search Results** (`src/pages/HotelSearchResults/HotelSearchResults.jsx`)
- Fetches hotels using `hotelAPI.getHotels()`
- Falls back to mock data if API fails
- Added loading and error states

✅ **Destinations Component** (`src/components/Destinations/Destinations.jsx`)
- Fetches destinations using `destinationsAPI.getDestinations()`
- Integrated with Redux store

✅ **Booking Detail Page** (`src/pages/BookingDetail/BookingDetail.jsx`)
- Connected to `bookingAPI.createBooking()`
- Includes traveler information and payment method
- Added loading and error states

✅ **Account Page** (`src/pages/Account/Account.jsx`)
- Connected to `authAPI.updateProfile()`
- Profile updates sent to API
- Added loading and error states

## Usage Examples

### Making a Login Request
```javascript
import { authAPI } from '../../api/api';

const response = await authAPI.login('user@example.com', 'password123');
if (response.success) {
  console.log('Login successful:', response.data);
} else {
  console.error('Login failed:', response.error);
}
```

### Searching Flights
```javascript
import { flightAPI } from '../../api/api';

const params = {
  from: 'New York',
  to: 'London',
  departureDate: '2024-01-20',
  passengers: 2
};

const response = await flightAPI.searchFlights(params);
if (response.success) {
  console.log('Flights found:', response.data);
}
```

### Creating a Booking
```javascript
import { bookingAPI } from '../../api/api';

const bookingData = {
  userId: 1,
  itemId: 123,
  type: 'flight',
  travelerInfo: { firstName: 'John', lastName: 'Doe' },
  paymentMethod: 'card-1'
};

const response = await bookingAPI.createBooking(bookingData, token);
if (response.success) {
  console.log('Booking created:', response.data);
}
```

## Error Handling

All API calls return a consistent response format:

### Success Response
```javascript
{
  success: true,
  data: { /* API response data */ }
}
```

### Error Response
```javascript
{
  success: false,
  error: "Error message describing what went wrong"
}
```

## Authentication

All API calls requiring authentication should include a token:

```javascript
const response = await authAPI.getProfile(userId, token);
```

The token is typically stored in Redux auth state:
```javascript
const { token } = useSelector(state => state.auth);
```

## Global Styles for API States

Added to `src/index.css`:

```css
.loading-message { /* Blue info box for loading states */ }
.error-message { /* Red error box for error states */ }
button:disabled { /* Disabled button styling */ }
input:disabled { /* Disabled input styling */ }
```

## Future Enhancements

Recommended next steps:
1. Implement user reviews integration
2. Add favorites/wishlist functionality
3. Implement real-time notifications for bookings
4. Add search filters for flights and hotels
5. Implement pagination for search results
6. Add caching for frequently accessed data

## Troubleshooting

### API Not Responding
- Check internet connection
- Verify API base URL is correct
- Check browser console for error details

### Authentication Errors
- Ensure token is valid and not expired
- Verify token is being passed correctly
- Check Redux store for auth state

### CORS Issues
- The API is configured for CORS requests
- No additional headers need to be added
- Check browser console for specific CORS error

## API Endpoints Summary

| Module | Endpoint | Method |
|--------|----------|--------|
| Auth | `/login` | POST |
| Auth | `/signup` | POST |
| Auth | `/logout` | POST |
| Flights | `/flights` | GET |
| Flights | `/flights/:id` | GET |
| Hotels | `/hotels` | GET |
| Hotels | `/hotels/:id` | GET |
| Bookings | `/bookings` | POST/GET |
| Bookings | `/bookings/:id` | GET/DELETE |
| Destinations | `/destinations` | GET |
| Destinations | `/destinations/:id` | GET |
| Reviews | `/reviews` | GET/POST |
| Favorites | `/favorites` | GET/POST/DELETE |
