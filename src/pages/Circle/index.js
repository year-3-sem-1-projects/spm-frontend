import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import DiscoverCircles from './discover-circles'
import Profile from './profile'
import Dashboard from './dashboard'

const Circle = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<DiscoverCircles />} />
        <Route path="/:name" element={<Profile />} />
        <Route path="/:name/:role/dashboard/*" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default Circle
