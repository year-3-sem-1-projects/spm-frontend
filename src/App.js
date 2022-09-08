import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/index'
import Question from './pages/Question/index'
import Circle from './pages/Circle/index'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Verify from './pages/Auth/Verify'
import Profile from './pages/User/Profile'


const App = () => {
  const currentUser = localStorage.getItem('token')
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/question/*" element={<Question />} />
      <Route path="/circle/*" element={<Circle />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/login" element={currentUser==null ? <Login /> : <Home />} />
      <Route path="/register" element={currentUser==null ? <Register /> : <Home />} />
    </Routes>
  )
}

export default App
