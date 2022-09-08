import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/index'
import Question from './pages/Question/index'
import Circle from './pages/Circle/index'
import User from './pages/User'
import Login from './pages/Auth/Login'

const App = () => {
  const currentUser = localStorage.getItem('token')
  console.log(currentUser)
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/question" element={<Question />} />
      <Route path="/circle" element={<Circle />} />
      <Route path="/profile" element={<User />} />
      <Route path="/login" element={currentUser==null ? <Login /> : <Home />} />
    </Routes>
  )
}

export default App
