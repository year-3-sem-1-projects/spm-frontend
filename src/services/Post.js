import axios from '../lib/axios'

//post create function
export const createPost = async postContent => {
  try {
    return (await axios.post('/api/post/add', postContent)).data
  } catch (err) {
    console.error(err)
  }
}

//post read function
export const readPost = async () => {
  try {
    return (await axios.get('/api/post/get/all-posts')).data.data
  } catch (err) {
    console.error(err)
  }
}

//post update function
export const updatePost = async postContent => {
  try {
    return (await axios.put('/api/post/edit', postContent)).data
  } catch (err) {
    console.error(err)
  }
}

//post delete function
export const deletePost = async postContent => {
  try {
    return (await axios.delete('/api/post/delete', postContent)).data.data
  } catch (err) {
    console.error(err)
  }
}

//post read by user id function
export const readPostByUserId = async ({ user_email }) => {
  try {
    return (await axios.get(`/api/post/get/${user_email}`)).data.data
  } catch (err) {
    console.error(err)
  }
}

// import axios from '../lib/axios'

// //post create function
// export const createPost = async postContent => {
//   try {
//     return (await axios.post('/api/post/add', postContent)).data
//   } catch (err) {
//     console.error(err)
//   }
// }

// //post read function
// export const readPost = async () => {
//   try {
//     return (await axios.get('/api/post/')).data.data
//   } catch (err) {
//     console.error(err)
//   }
// }

// //post update function
// export const updatePost = async (id, postContent) => {
//   try {
//     return (await axios.get(`/api/post/${id}`, postContent)).data
//   } catch (err) {
//     console.error(err)
//   }
// }

// //post delete function
// export const deletePost = async id => {
//   try {
//     return (await axios.delete(`/api/post/${id}`)).data.data
//   } catch (err) {
//     console.error(err)
//   }
// }
