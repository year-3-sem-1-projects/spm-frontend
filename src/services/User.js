import axios from '../lib/axios'

export const login = async data => {
  const response = await axios.post('/api/auth/login', data)
  return response
}

export const register = async data => {
  const response = await axios.post('/api/auth/register', data)
  return response
}

export const verify = async data => {
  const response = await axios.post('/api/auth/register/verify', data)
  return response
}

export const updateUser = async data => {
  const response = await axios.post('/api/user/editUser', data)
  return response
}