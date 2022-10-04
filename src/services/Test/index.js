import axios from '../../lib/axios'

//test create function

//axios.post(api url without the base url, form data as object)
//returns a promise

export const createTest = async ({ name }) => {
  axios
    .post('/api/test/add', {
      name,
    })
    .then(res => {
      console.log(res)
    })
    .catch(e => console.error(e))
}

//test read function
//axios.get(api url without the base url)
//use async await function return the resolve of the promise
//put await inside try catch block to catch errors
export const readTest = async () => {
  try {
    return (await axios.get('/api/test/read')).data.data
  } catch (err) {
    console.error(err)
  }
}
