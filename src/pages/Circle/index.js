import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import DiscoverCircles from './discover-circles'
import Profile from './profile'
import Form from './discover-circles/Form'

const Circle = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<DiscoverCircles />} />
        <Route path="/:name" element={<Profile />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </>
  )
}

export default Circle
