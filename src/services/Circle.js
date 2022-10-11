import axios from '../lib/axios'

export const getAllCircles = async () => {
  try {
    return (await axios.get('/api/circle/circles')).data.data
  } catch (err) {
    console.error(err)
  }
}

export const getCircle = async name => {
  try {
    return (await axios.get(`/api/circle/circle/${name}`)).data.data
  } catch (err) {
    console.error(err)
  }
}

export const createCircle = async data => {
  try {
    return (await axios.post('/api/circle/add', data)).data
  } catch (err) {
    console.error(err)
  }
}

export const updateCircle = async data => {
  try {
    return (await axios.put(`/api/circle/update/circle`, data)).data
  } catch (err) {
    console.error(err)
  }
}
