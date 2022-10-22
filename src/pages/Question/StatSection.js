import React, { useEffect, useState } from 'react'
import { getAnswersByUser } from '../../services/Question'
import jwt_decode from 'jwt-decode'
import BarChart from '../../components/charts/BarChart'

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
  const data = {
    labels: [
      'October 22',
    ],
    datasets: [
      {
        type: 'line',
        label: 'Answer Count',
        backgroundColor: [
          'rgba(75,192,192,1)',
          '#50AF95',
          '#f3ba2f',
          '#2a71d0',
          '#f3ba2f',
          '#2a71d0',
          '#f3ba2f',
        ],
        borderColor: 'black',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [answerCount],
      },
    ],
  }
  const data2 = {
    labels: [
      'October 22',
    ],
    datasets: [
      {
        type: 'line',
        label: 'Question Count',
        backgroundColor: [
          'rgba(75,192,192,1)',
          '#50AF95',
          '#f3ba2f',
          '#2a71d0',
          '#f3ba2f',
          '#2a71d0',
          '#f3ba2f',
        ],
        borderColor: 'black',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [questionCount],
      },
    ],
  }
    return (
      <>
         <div>
        <BarChart data={data} />
      </div>
      <div>
        <BarChart data={data2} />
      </div>
      </>
    )
  }
  export default StatSection