import axios from '../../lib/axios'

export const login = async data => {
  const response = await axios.post('/api/auth/login', data)
  return response
}
