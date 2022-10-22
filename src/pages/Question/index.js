import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import AddQuestion from './AddQuestion'
import SideNavigation from '../../components/SideNavigation/SideNavigation.jsx'
import QuizIcon from '@mui/icons-material/Quiz'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import CreateIcon from '@mui/icons-material/Create'
import BarChartIcon from '@mui/icons-material/BarChart'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import FilterOptions from '../../components/FilterOptions/FilterOptions.jsx'
import { Container, Paper, TextField, Typography } from '@mui/material'
import QuestionComponent from '../../components/Question/QuestionComponent'
import AnswerSection from './AnswerSection'
import QuestionAndAnswers from './QuestionAndAnswers'
import { readAllQuestions } from '../../services/Question'
import Loading from '../../components/Loading/Loading'
import { Route, Routes } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import StatSection from './StatSection'
import FeedbackSnackbar from '../../components/Snackbar/FeedbackSnackbar'

const Index = () => {
  const currentUser = jwt_decode(localStorage.getItem('token')).data
  const [questionData, setQuestionData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [filterOptions, setFilterOptions] = useState(['ALL'])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  // const [success, setSuccess] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)


  useEffect(() => {
    if (currentUser) {
      readAllQuestions()
        .then(res => {
          console.log('Read all questions res: ', res)
          setQuestionData(res)
          if (filterOptions.includes('ALL')) {
            setFilterData(res)
          } else {
            setFilterData(
              res.filter(question => {
                if (filterOptions.includes(question.category)) {
                  return question
                }
                return null
              }),
            )
          }
          setLoading(false)
        })
        .catch(err => {
          console.log('Error in reading all questions: ', err)
          setError(true)
          setLoading(false)
        })
    }
  }, [filterOptions])
  const handleSearch = e => {
    console.log('searching')
    console.log(e)
    if (e === '') return setFilterData(questionData)
    setFilterData(
      questionData.filter(data =>
        data.question.toLowerCase().includes(e.toLowerCase()),
      ),
    )
  }
  const handleClickCategory = (category, checked) => {
    if (checked) {
      setFilterOptions([...filterOptions, category])
    } else {
      setFilterOptions(filterOptions.filter(option => option !== category))
    }
  }
  const items = [
    {
      name: 'Recommended Questions',
      icon: <AutoAwesomeIcon />,
      link: `recommended`,
    },
    {
      name: 'My Questions',
      icon: <QuizIcon />,
      link: `my`,
    },
    {
      name: 'My Answers',
      icon: <CreateIcon />,
      link: `answers`,
    },
    {
      name: 'Stats',
      icon: <BarChartIcon />,
      link: `stats`,
    },
  ]
  if (loading) {
    return <Loading loading={loading} />
  } else if (error) {
    return <div>Error</div>
  } else {
    return (
      <>
        <Navbar />
        <Container>
          <Grid
            container
            columnSpacing={{ xs: 1, sm: 2, md: 4, lg: 6 }}
            sx={{
              marginTop: '50px',
            }}
          >
            <Grid item md={3} zeroMinWidth>
              <Grid
                item
                sx={{
                  marginBottom: '40px',
                }}
              >
                <Paper className={`p-5`}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    Questions & Answers
                  </Typography>
                </Paper>
              </Grid>
              <Grid item className={`pb-10`} zeroMinWidth>
                <SideNavigation menuItems={items} />
              </Grid>
            </Grid>
            <Grid item md={6}>
              <Grid
                item
                sx={{
                  marginBottom: '35px',
                }}
              >
                <Paper className={`p-4`}>
                  <Box>
                    <TextField
                      sx={{ height: '30px', marginBottom: '12px' }}
                      fullWidth
                      id="outlined-basic"
                      placeholder={`Search for questions`}
                      variant="outlined"
                      dense
                      onChange={e => handleSearch(e.target.value)}
                    />
                  </Box>
                  <Box
                    sx={{
                      marginTop: '10px',
                    }}
                  ></Box>
                </Paper>
              </Grid>
              <Grid item zeroMinWidth>
                <Routes>
                  <Route
                    path="/recommended"
                    element={
                      <QuestionSection
                        questionData={filterData}
                        setQuestionData={setQuestionData}
                        setFilterData={setFilterData}
                      />
                    }
                  />
                  <Route
                    path="/my"
                    element={
                      <MyQuestionSection
                        questionData={questionData}
                        setQuestionData={setQuestionData}
                      />
                    }
                  />
                  <Route path="/answers" element={<AnswerSection />} />
                  <Route path="/stats" element={<StatSection />} />
                  <Route
                    path={`/question-and-answers/:questionId`}
                    element={<QuestionAndAnswers />}
                  />
                </Routes>
              </Grid>
            </Grid>
            <Grid item md={3} zeroMinWidth>
              <Grid
                item
                sx={{
                  marginBottom: '40px',
                }}
              >
                <AddQuestion setQuestionData={setQuestionData} setFilterData={setFilterData} setOpenSnackbar={setOpenSnackbar} setFeedbackMessage={setFeedbackMessage} />
              </Grid>
              <Grid item className={`pb-10`} zeroMinWidth>
                <FilterOptions 
                  handleClick={handleClickCategory}
                  isDefaultChecked={true}
                />
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <FeedbackSnackbar isOpen={openSnackbar} snackbarMessage={feedbackMessage} />
      </>
    )
  }
}
const QuestionSection = ({ questionData, setQuestionData, setFilterData }) => {
  return (
    <>
      {questionData.map(data => (
        <QuestionComponent data={data} setQuestionData={setQuestionData} setFilterData={setFilterData} />
      ))}
    </>
  )
}
const MyQuestionSection = ({ questionData, setQuestionData }) => {
  console.log('questionData IN MY QUESTIONS SECTION:::', questionData)
  const currentUser = jwt_decode(localStorage.getItem('token')).data
  const [myQuestionData, setMyQuestionData] = useState(
    questionData.filter(data => data.user_email === currentUser.email),
  )
  useEffect(() => {
    setMyQuestionData(
      questionData.filter(data => data.user_email === currentUser.email),
    )
  }, [questionData])
  return (
    <>
      {myQuestionData.map(data => (
        <QuestionComponent data={data} setQuestionData={setQuestionData} />
      ))}
    </>
  )
}

export default Index
