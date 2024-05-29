import React from 'react'
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import AddRoom from "./components/room/AddRoom"
import ExistingRooms from './components/room/ExistingRooms.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home.jsx'
import EditRoom from './components/room/EditRoom.jsx'
import NavBar from './components/layout/NavBar.jsx'
import Footer from './components/layout/Footer.jsx'
import RoomListing from './components/room/RoomListing.jsx'
import Admin from './components/admin/Admin.jsx'
import Checkout from './components/bookings/Checkout';
import BookingSuccess from './components/bookings/BookingSuccess';
import Bookings from './components/bookings/Bookings.jsx'
import FindBooking from './components/bookings/FindBooking.jsx'
import Login from './components/auth/Login.jsx'
import Registration from './components/auth/Registration.jsx'
import Profile from './components/auth/Profile.jsx'
import Logout from './components/auth/Logout.jsx'
import RequireAuth from './components/auth/RequireAuth.jsx'
import AuthProvider from './components/auth/AuthProvider.jsx';



function App() {

  return (
    <>
    <AuthProvider>
    <main>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/edit-room/:roomId" element={<EditRoom/>}/>
          <Route path="/existing-rooms" element={<ExistingRooms/>}/>
          <Route path="/add-room" element={<AddRoom/>}/>
          <Route path="/book-room/:roomId"element={
              <RequireAuth>
                  <Checkout />
              </RequireAuth>
                
              
              }/>
          <Route path="/browse-all-rooms" element={<RoomListing/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/booking-success" element={<BookingSuccess/>}/>
          <Route path="/existing-bookings" element={<Bookings/>}/>
          <Route path="/find-booking" element={<FindBooking/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Registration/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/logout" element={<Logout/>}/>
        </Routes>
      </Router>
      <Footer />

    </main>
    </AuthProvider>
      
    
      
    </>
  )
}

export default App
