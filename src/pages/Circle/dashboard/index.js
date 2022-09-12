import React from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import Settings from './settings'
import People from './people'
import Stats from './stats'
import Leave from './leave'

const Dashboard = () => {
  const { role } = useParams()
  if (role === 'admin') {
    return (
      <>
        <Routes>
          <Route path="settings" element={<Settings />} />
          <Route path="people" element={<People />} />
          <Route path="stats" element={<Stats />} />
          <Route path="leave" element={<Leave />} />
        </Routes>
      </>
    )
  }
  if (role === 'member') {
    return (
      <>
        <Routes>
          <Route path="people" element={<People />} />
          <Route path="leave" element={<Leave />} />
        </Routes>
      </>
    )
  }
}

export default Dashboard
