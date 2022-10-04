// import axios from "axios";
// import requestConfig from "./config";
// import requestConfigJson from "./configJson";

// // const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}`;

// class WorkoutAPI {
// 	static getWorkoutData() {
// 		return axios.get(`/api/post/`, requestConfig);
// 	}

// 	static addWorkout(newWorkout) {
// 		return axios.post(`/api/post/`, newWorkout, requestConfigJson);
// 	}

// 	static deleteWorkout(id) {
// 		return axios.delete(`/api/post/${id}`, requestConfig);
// 	}

// 	static editWorkout(id, newWorkout) {
// 		return axios.put(`/api/post/${id}`, newWorkout, requestConfigJson);
// 	}

// 	static searchWorkout(search) {
// 		return axios.get(`/api/post/search/${search}`, requestConfigJson);
// 	}

// 	static incrementViewCount(id) {
// 		return axios.put(`/api/post/view/${id}`, requestConfigJson);
// 	}

// 	static getMostPopularWorkouts() {
// 		return axios.get(`/api/post/popular/`, requestConfig);
// 	}
// }

// export default WorkoutAPI;

// import axios from '../../lib/axios'

// export const createTest = async ({ name }) => {
//   await axios
//     .post('/api/test/add', {
//       name,
//     })
//     .then(res => {
//       console.log(res)
//     })
//     .catch(e => console.error(e))
// }

// export const readTest = async () => {
//   return (await axios.get('/api/test/read')).data.data
// }
