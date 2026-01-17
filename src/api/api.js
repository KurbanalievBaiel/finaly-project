const API_BASE = "https://696b6250624d7ddccaa106b5.mockapi.io";

// Helper function to make API calls
const apiCall = async (endpoint, method = "GET", data = null, token = null) => {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, error: error.message };
  }
};

// Auth APIs
export const authAPI = {
  // Login user
  login: async (email, password) => {
    return apiCall("/login", "POST", { email, password });
  },

  // Sign up new user
  signup: async (userData) => {
    return apiCall("/signup", "POST", userData);
  },

  // Logout user
  logout: async (token) => {
    return apiCall("/logout", "POST", {}, token);
  },

  // Get user profile
  getProfile: async (userId, token) => {
    return apiCall(`/users/${userId}`, "GET", null, token);
  },

  // Update user profile
  updateProfile: async (userId, userData, token) => {
    return apiCall(`/users/${userId}`, "PUT", userData, token);
  },
};

// Flight APIs
export const flightAPI = {
  // Search flights
  searchFlights: async (searchParams) => {
    const queryString = new URLSearchParams(searchParams).toString();
    return apiCall(`/flights?${queryString}`, "GET");
  },

  // Get flight details
  getFlightDetails: async (flightId) => {
    return apiCall(`/flights/${flightId}`, "GET");
  },

  // Get available flights
  getFlights: async () => {
    return apiCall("/flights", "GET");
  },
};

// Hotel/Stay APIs
export const hotelAPI = {
  // Search hotels
  searchHotels: async (searchParams) => {
    const queryString = new URLSearchParams(searchParams).toString();
    return apiCall(`/hotels?${queryString}`, "GET");
  },

  // Get hotel details
  getHotelDetails: async (hotelId) => {
    return apiCall(`/hotels/${hotelId}`, "GET");
  },

  // Get available hotels
  getHotels: async () => {
    return apiCall("/hotels", "GET");
  },
};

// Booking APIs
export const bookingAPI = {
  // Create booking
  createBooking: async (bookingData, token) => {
    return apiCall("/bookings", "POST", bookingData, token);
  },

  // Get user bookings
  getUserBookings: async (userId, token) => {
    return apiCall(`/bookings?userId=${userId}`, "GET", null, token);
  },

  // Get booking details
  getBookingDetails: async (bookingId, token) => {
    return apiCall(`/bookings/${bookingId}`, "GET", null, token);
  },

  // Cancel booking
  cancelBooking: async (bookingId, token) => {
    return apiCall(`/bookings/${bookingId}`, "DELETE", {}, token);
  },
};

// Destinations APIs
export const destinationsAPI = {
  // Get all destinations
  getDestinations: async () => {
    // MockAPI doesn't have /destinations endpoint, returning fallback data
    const mockData = [
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
    ];
    return { success: true, data: mockData };
  },

  // Get destination details
  getDestinationDetails: async (destinationId) => {
    return apiCall(`/destinations/${destinationId}`, "GET");
  },
};

// Reviews APIs
export const reviewsAPI = {
  // Get reviews for a destination/hotel
  getReviews: async (entityType, entityId) => {
    return apiCall(`/reviews?entityType=${entityType}&entityId=${entityId}`, "GET");
  },

  // Create review
  createReview: async (reviewData, token) => {
    return apiCall("/reviews", "POST", reviewData, token);
  },
};

// Favorites APIs
export const favoritesAPI = {
  // Get user favorites
  getFavorites: async (userId, token) => {
    return apiCall(`/favorites?userId=${userId}`, "GET", null, token);
  },

  // Add to favorites
  addFavorite: async (favoriteData, token) => {
    return apiCall("/favorites", "POST", favoriteData, token);
  },

  // Remove from favorites
  removeFavorite: async (favoriteId, token) => {
    return apiCall(`/favorites/${favoriteId}`, "DELETE", {}, token);
  },
};

export default {
  authAPI,
  flightAPI,
  hotelAPI,
  bookingAPI,
  destinationsAPI,
  reviewsAPI,
  favoritesAPI,
};