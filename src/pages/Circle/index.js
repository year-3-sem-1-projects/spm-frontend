import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import DiscoverCircles from './discover-circles'
import Profile from './profile'

const Circle = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<DiscoverCircles />} />
        <Route path="/:name" element={<Profile />} />
      </Routes>
    </>
  )
}

export default Circle
