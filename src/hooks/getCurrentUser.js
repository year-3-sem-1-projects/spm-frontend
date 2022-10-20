import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'

const GetCurrentUser = () => {
  const currentUser = localStorage.getItem('token')
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (currentUser && !user) {
      const decodedToken = jwt_decode(currentUser)
      setUser(decodedToken.data)
    }
  }, [user, currentUser])
  if (user != null) return user
}

export default GetCurrentUser
