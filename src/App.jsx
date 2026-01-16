import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import FlightsHotels from './components/FlightsHotels/FlightsHotels'
import Destinations from './components/Destinations/Destinations'
import Reviews from './components/Reviews/Reviews'
import Newsletter from './components/Newsletter/Newsletter'
import Footer from './components/Footer/Footer'
import FindFlight from './pages/FindFlight/FindFlight'
import FlightSearchResults from './pages/FlightSearchResults/FlightSearchResults'
import HotelSearchResults from './pages/HotelSearchResults/HotelSearchResults'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Account from './pages/Account/Account'
import BookingDetail from './pages/BookingDetail/BookingDetail'
import BookingSuccess from './pages/BookingSuccess/BookingSuccess'
import FindStay from './pages/FindStay/FindStay'
import './App.css'

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <FlightsHotels />
      <Destinations />
      <Reviews />
      <Newsletter />
      <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find-flight" element={<FindFlight />} />
          <Route path="/find-stay" element={<FindStay />} />
          <Route path="/flight-search-results" element={<FlightSearchResults />} />
          <Route path="/hotel-search-results" element={<HotelSearchResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
          <Route path="/booking-detail" element={<BookingDetail />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App


