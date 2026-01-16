import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  destinations: [
    {
      id: 1,
      city: 'Istanbul',
      country: 'Turkey',
      image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      city: 'Sydney',
      country: 'Australia',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      city: 'Baku',
      country: 'Azerbaijan',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    },
    {
      id: 4,
      city: 'Malé',
      country: 'Maldives',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=300&fit=crop',
    },
    {
      id: 5,
      city: 'Paris',
      country: 'France',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    },
    {
      id: 6,
      city: 'New York',
      country: 'US',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop',
    },
    {
      id: 7,
      city: 'London',
      country: 'UK',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop',
    },
    {
      id: 8,
      city: 'Tokyo',
      country: 'Japan',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
    },
    {
      id: 9,
      city: 'Dubai',
      country: 'UAE',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop',
    },
  ],
}

const destinationsSlice = createSlice({
  name: 'destinations',
  initialState,
  reducers: {},
})

export default destinationsSlice.reducer

