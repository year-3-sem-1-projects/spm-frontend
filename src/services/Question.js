import axios from '../lib/axios'

//question create function
export const createQuestion = async (questionContent) => {
    try {
        return (await axios.post('/api/question/add', questionContent)).data
    } catch (err) {
        console.error(err)
    }
}

//question read function - all questions
export const readAllQuestions = async () => {
    try {
        return (await axios.get('/api/question/get/all-questions')).data.data
    } catch (err) {
        console.error(err)
    }
}

//question update function
export const updateQuestion = async (questionContent) => {
    try {
        return (await axios.put('/api/question/edit', questionContent)).data
    } catch (err) {
        console.error(err)
    }
}

//question delete function
export const deleteQuestion = async questionContent => {
    console.log('questionContent in deleteQuestion', questionContent._id)
    try {
        return await axios.delete(`/api/question/delete/${questionContent._id}`)
    } catch (err) {
        console.error(err)
    }
}

//get user interest function
export const getUserInterests = async (email) => {
    try {
        return (await axios.get(`/api/question/get/user-interests/${email}`)).data.data
    } catch (err) {
        console.error(err)
    }
}

//question read by user function
export const readQuestionByUser = async (email) => {
    try {
        return (await axios.get(`/api/get/my-questions/${email}`)).data.data
    } catch (err) {
        console.error(err)
    }
}

//post answer function
export const postAnswer = async (answerContent) => {
    console.log('answer content is service: ', answerContent)
    try {
        return (await axios.post('/api/question/answer/add', answerContent)).data
    } catch (err) {
        console.error(err)
    }
}

//get answers by question function
export const getAnswersByQuestion = async (questionId) => {
    try {
        return (await axios.get(`/api/question/get/answers/${questionId}`)).data.data
    } catch (err) {
        console.error(err)
    }
}

//get answers by user function
export const getAnswersByUser = async (email) => {
    try {
        return (await axios.get(`/api/question/get/my-answers/${email}`)).data.data
    } catch (err) {
        console.error(err)
    }
}

//get question by question id function
export const getQuestionByQuestionId = async (questionId) => {
    console.log('question id in service: ', questionId)
    try {
        return (await axios.get(`/api/question/get/question-by-id/${questionId}`)).data.data
    } catch (err) {
        console.error(err)
    }
}

