import React, { useEffect, useState } from 'react'
import { getAnswersByQuestion, getQuestionByQuestionId } from '../../services/Question'
import { useParams } from 'react-router-dom'
import QuestionComponent from '../../components/Question/QuestionComponent'
import AnswerComponent from '../../components/Answer/AnswerComponent'
import { Typography } from '@mui/material'
import jwt_decode from 'jwt-decode'

const QuestionAndAnswers = () => {
  const currentUser = jwt_decode(localStorage.getItem('token')).data
  const { questionId } = useParams()
  console.log('questionId in question and answers: ', questionId)
  const [question, setQuestion] = useState({})
  const [answers, setAnswers] = useState([])
  useEffect(() => {
    getQuestionByQuestionId(questionId)
      .then(res => {
        console.log('Question by question id res: ', res)
        setQuestion(res)
        getAnswersByQuestion(questionId)
            .then(res => {
                console.log('Answers by question id res: ', res)
                setAnswers(res)
            })
            .catch(err => {
                console.log('Answers by question id err: ', err)
            })
      })
      .catch(err => {
        console.log('Error in getting question by question id: ', err)
      })
  }, [questionId])
  return (
    <>
      <QuestionComponent data={question} />
      {/* <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          margin: 1,
        }}
      >
        Answers
      </Typography> */}
      {answers.map(answer => (
        <AnswerComponent data={answer} isMyAnswers={false} />
    ))}
    </>
  )
}

export default QuestionAndAnswers
