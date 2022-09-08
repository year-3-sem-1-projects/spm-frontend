import axios from '../lib/axios'

export const getAllCircles = async () => {
  try {
    console.log(await axios.get('/api/circle/circles'))
  } catch (err) {
    console.error(err)
  }
}
