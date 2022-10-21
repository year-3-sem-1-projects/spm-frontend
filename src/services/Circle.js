import axios from '../lib/axios'

export const getAllCircles = async () => {
  try {
    return (await axios.get('/api/circle')).data.data
  } catch (err) {
    console.error(err)
  }
}

export const getCircle = async name => {
  try {
    return (await axios.get(`/api/circle/${name}`)).data.data
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
    return await axios.put(`/api/circle/update`, data)
  } catch (err) {
    console.error(err)
  }
}

export const deleteCircle = async data => {
  try {
    return await axios.delete(`/api/circle/remove/circle`, { data })
  } catch (err) {
    console.error(err)
  }
}

export const leaveCircle = async data => {
  try {
    return await axios.delete(`/api/circle/leave`, { data })
  } catch (err) {
    console.error(err)
  }
}
