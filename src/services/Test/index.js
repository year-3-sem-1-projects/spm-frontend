import axios from '../../lib/axios'

export const createTest = async ({ name }) => {
  await axios
    .post('/api/test/add', {
      name,
    })
    .then(res => {
      console.log(res)
    })
    .catch(e => console.error(e))
}

export const readTest = async () => {
  return (await axios.get('/api/test/read')).data.data
}
