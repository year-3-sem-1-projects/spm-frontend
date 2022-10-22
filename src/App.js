import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Post from './pages/Post/index'
import MyPost from './pages/MyPost/index'
import Chart from './pages/PostStats/index'
import Question from './pages/Question/index'
import Circle from './pages/Circle/index'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Verify from './pages/Auth/Verify'
import UserProfile from './pages/User/UserProfile'
import Interest from './pages/Auth/Interest'
import GetCurrentUser from './hooks/getCurrentUser'
import Loading from './components/Loading/Loading'
import jwt_decode from 'jwt-decode'

const App = () => {
  // const currentUser = localStorage.getItem('token')
  // const [user, setUser] = useState(null)
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState(false)

  // useEffect(() => {
  //   if (currentUser) {
  //     try {
  //       const decodedToken = jwt_decode(currentUser)
  //       setUser(decodedToken.data)

  //     } catch (error) {
  //       setError(true)
  //     } finally {
  //       setLoading(false)
  //     }
  //     // setLoading(false)
  //     // setError(false)
  //   }
  // }, [user, currentUser])

  // if (loading) {
  //   return <Loading loading={loading} />
  // } else {

  // }

  const currentUser = GetCurrentUser()

  return (
    <Routes>
      <Route path="/" element={<Post />} />
      <Route path="/myposts" element={<MyPost />} />
      <Route path="/stats" element={<Chart />} />
      <Route path="/question/*" element={<Question />} />
      <Route path="/circle/*" element={<Circle />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/login" element={currentUser ? <Post /> : <Login />} />
      <Route path="/register" element={currentUser ? <Post /> : <Register />} />
      <Route path="/user" element={currentUser ? <UserProfile /> : <Login />} />
      <Route path="/interest" element={<Interest />} />
      {/* element={currentUser==null ? <Login /> :} */}
    </Routes>
  )
}

export default App
