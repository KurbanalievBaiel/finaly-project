import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeTab: 'flights',
  flights: {
    from: 'Lahore',
    to: 'Karachi',
    tripType: 'Return',
    departureDate: '',
    passengers: 1,
    class: 'Economy',
  },
  stays: {
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
  },
  promoCode: '',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload
    },
    updateFlightsSearch: (state, action) => {
      state.flights = { ...state.flights, ...action.payload }
    },
    updateStaysSearch: (state, action) => {
      state.stays = { ...state.stays, ...action.payload }
    },
    swapLocations: (state) => {
      const temp = state.flights.from
      state.flights.from = state.flights.to
      state.flights.to = temp
    },
    setPromoCode: (state, action) => {
      state.promoCode = action.payload
    },
  },
})

export const {
  setActiveTab,
  updateFlightsSearch,
  updateStaysSearch,
  swapLocations,
  setPromoCode,
} = searchSlice.actions

export default searchSlice.reducer

