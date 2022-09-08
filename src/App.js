import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/index'
import Question from './pages/Question/index'
import Circle from './pages/Circle/index'
import User from './pages/User'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/question/*" element={<Question />} />
      <Route path="/circle" element={<Circle />} />
      <Route path="/profile" element={<User />} />
    </Routes>
  )
}

export default App
