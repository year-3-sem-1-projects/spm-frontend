import axios from '../../lib/axios'

//question create function
export const createQuestion = async (questionContent) => {
    try {
        return (await axios.post('/api/question/add', questionContent)).data.data
    } catch (err) {
        console.error(err)
    }
}

//question read function
export const readQuestion = async () => {
    try {
        return (await axios.get('/api/question/get/all-questions')).data.data
    } catch (err) {
        console.error(err)
    }
}

//question update function
export const updateQuestion = async (questionContent) => {
    try {
        return (await axios.put('/api/question/edit', questionContent)).data.data
    } catch (err) {
        console.error(err)
    }
}

//question delete function
export const deleteQuestion = async (questionContent) => {
    try {
        return (await axios.delete('/api/question/delete', questionContent)).data.data
    } catch (err) {
        console.error(err)
    }
}

//question read by user id function
export const readQuestionByUserId = async ({user_email}) => {
    try {
        return (await axios.get(`/api/question/get/${user_email}`)).data.data
    } catch (err) {
        console.error(err)
    }
}
