import React from 'react'
import { Route, Routes } from 'react-router-dom'
// import Home from './pages/Home/index'
import Question from './pages/Question/index'
import Circle from './pages/Circle/index'
import Post from './pages/Post/index'
import User from './pages/User'
import { ModalsProvider } from '@mantine/modals'

const App = () => {
  return (
    <ModalsProvider>
      <Routes>
        <Route path="/" element={<Post />} />
        {/* <Route path="/post" element={<Post />} /> */}
        <Route path="/question" element={<Question />} />
        <Route path="/circle" element={<Circle />} />
        <Route path="/profile" element={<User />} />
      </Routes>
    </ModalsProvider>
  )
}

export default App
