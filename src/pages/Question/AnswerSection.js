import React, { useEffect, useState } from 'react'
import AnswerComponent from '../../components/Answer/AnswerComponent'
import { getAnswersByUser } from '../../services/Question'
import jwt_decode from 'jwt-decode'

export default function AnswerSection() {
    const currentUser = jwt_decode(localStorage.getItem('token')).data;
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        getAnswersByUser(currentUser.email)
            .then(res => {
                console.log('Read all answers by user res: ', res)
                setAnswers(res)
            })
            .catch(err => {
                console.log('Error in reading all answers by user: ', err)
            })
    }, [])

  return (
    <>
        {answers.map((data, index) => (
            <AnswerComponent
                key={index}
                data={data}
                isMyAnswers={true}
            />
        ))}
    </>
  )
}
