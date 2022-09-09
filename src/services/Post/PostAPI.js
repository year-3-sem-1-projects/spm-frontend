import axios from '../../lib/axios'

class PostAPI {
  static getPostData() {
    return axios.get(`/api/post/`)
  }

  static addPost(newPost) {
    return axios.post(`/api/post/add`, newPost)
  }

  static deletePost(id) {
    return axios.delete(`/api/post/${id}`)
  }

  static editPost(id, newPost) {
    return axios.put(`/api/post/${id}`, newPost)
  }

  static searchPost(search) {
    return axios.get(`/api/post/search/${search}`)
  }

  static incrementViewCount(id) {
    return axios.put(`/api/post/view/${id}`)
  }

  // static getMostPopularPosts() {
  //   return axios.get(`api/post/popular`)
  // }
}

export default PostAPI
