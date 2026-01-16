import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    signup: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    addBooking: (state, action) => {
      if (!state.user.bookings) {
        state.user.bookings = [];
      }
      state.user.bookings.push({
        ...action.payload,
        id: Date.now(),
        date: new Date().toLocaleDateString()
      });
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    toggleFavorite: (state, action) => {
      if (!state.user.wishlist) {
        state.user.wishlist = [];
      }
      const { id, type } = action.payload;
      const index = state.user.wishlist.findIndex(item => item.id === id && item.type === type);
      
      if (index === -1) {
        state.user.wishlist.push(action.payload);
      } else {
        state.user.wishlist.splice(index, 1);
      }
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    addCard: (state, action) => {
      if (!state.user.cards) {
        state.user.cards = [
          { id: 'card-1', brand: 'VISA', last4: '4321', expiry: '02/27' }
        ];
      }
      state.user.cards.push({
        ...action.payload,
        id: Date.now().toString()
      });
      localStorage.setItem('user', JSON.stringify(state.user));
    }
  },
});

export const { login, logout, signup, updateProfile, addBooking, toggleFavorite, addCard } = authSlice.actions;
export default authSlice.reducer;
