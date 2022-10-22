import React, { useEffect, useState } from 'react'
import { getAnswersByUser } from '../../services/Question'
import jwt_decode from 'jwt-decode'

const StatSection = ({questionData}) => {
  const [questionCount, setQuestionCount] = useState(0)
  const [answerCount, setAnswerCount] = useState(0)
  const currentUser = jwt_decode(localStorage.getItem('token')).data
  useEffect(() => {
    setQuestionCount(questionData.filter(question => question.user_email === currentUser.email).length)
    getAnswersByUser(currentUser.email)
      .then(res => {
        console.log('getAnswersByUser res: ', res)
        setAnswerCount(res.length)
      })
      .catch(err => console.log(err))
  }, [currentUser.email, answerCount, questionData])

    return (
      <>
        answer count : {answerCount}
        question count : {questionCount}
      </>
    )
  }
  export default StatSection